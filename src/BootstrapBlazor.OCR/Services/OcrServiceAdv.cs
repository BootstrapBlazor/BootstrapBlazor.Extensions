// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.OCR.Services;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BootstrapBlazor.Ocr.Services;

/// <summary>
/// OCR
/// </summary>
public partial class OcrService : BaseService<ReadResult>
{
    #region 分析图像
    // 创建一个列表，定义要从图像中提取的特征。 
    public List<VisualFeatureTypes?> Features = new List<VisualFeatureTypes?>()
    {
            VisualFeatureTypes.Categories, VisualFeatureTypes.Description,
            VisualFeatureTypes.Faces, VisualFeatureTypes.ImageType,
            VisualFeatureTypes.Tags, VisualFeatureTypes.Adult,
            VisualFeatureTypes.Color, VisualFeatureTypes.Brands,
            VisualFeatureTypes.Objects
    };

    /// <summary>
    /// 分析图像
    /// <para>分析图像以获得特征和其他属性</para>
    ///<para></para>分析 URL 图片。提取标题、类别、标签、对象、面孔、色情/成人/血腥内容，
    ///<para></para>品牌、名人、地标、配色方案和图像类型。
    /// </summary> 
    /// <param name="urlImage">URL</param> 
    /// <param name="stream">流</param> 
    /// <param name="localImage">本地图片文件</param> 
    /// <returns></returns>
    public async Task<List<string>> AnalyzeImage(string? urlImage = null, Stream? stream = null, string? localImage = null)
    {
        await GetStatus($"分析图像 -  {Desc(urlImage, stream, localImage)}...");

        if (stream == null && !string.IsNullOrEmpty(localImage))
        {
            // 检测本地图像中特定于域的内容。
            stream = File.OpenRead(localImage);
        }
        //分析 URL 图片
        ImageAnalysis results = (stream == null) ? await Client.AnalyzeImageAsync(urlImage, visualFeatures: Features) : await Client.AnalyzeImageInStreamAsync(stream, visualFeatures: Features);

        var res = await AnalyzeResults(results);

        return res;
    }

    /// <summary>
    /// 分析图像
    /// </summary>
    /// <param name="results"></param>
    /// <returns></returns>
    public async Task<List<string>> AnalyzeResults(ImageAnalysis results)
    {
        var res = new List<string>();

        // 对图像内容进行概述。
        if (null != results.Description && null != results.Description.Captions)
        {
            res.Add(await GetStatus("概括:"));
            foreach (var caption in results.Description.Captions)
            {
                res.Add(await GetStatus($"{caption.Text} 可信度 {caption.Confidence:P2}"));
            }
            res.Add(await GetStatus());
        }

        // 显示图像被划分的类别。
        if (null != results.Categories)
        {
            res.Add(await GetStatus("类别:"));
            foreach (var category in results.Categories)
            {
                res.Add(await GetStatus($"{category.Name} 可信度 {category.Score:P2}"));
            }
            res.Add(await GetStatus());
        }

        // 图像标签及其置信度得分
        if (null != results.Tags)
        {
            res.Add(await GetStatus("标签:"));
            foreach (var tag in results.Tags)
            {
                res.Add(await GetStatus($"{tag.Name} 可信度 {tag.Confidence:P2}"));
            }
            res.Add(await GetStatus());
        }

        // 对象
        if (null != results.Objects)
        {
            res.Add(await GetStatus("对象:"));
            foreach (var obj in results.Objects)
            {
                res.Add(await GetStatus($"{obj.ObjectProperty} 可信度 {obj.Confidence:P2} 位置 {obj.Rectangle.X}, " +
                  $"{obj.Rectangle.X + obj.Rectangle.W}, {obj.Rectangle.Y}, {obj.Rectangle.Y + obj.Rectangle.H}"));
            }
            res.Add(await GetStatus());
        }

        // 面孔
        if (null != results.Faces)
        {

            res.Add(await GetStatus("面孔:"));
            foreach (var face in results.Faces)
            {
                res.Add(await GetStatus($"面孔 {face.Gender} 年龄 {face.Age} 位置 {face.FaceRectangle.Left}, " +
                  $"{face.FaceRectangle.Left}, {face.FaceRectangle.Top + face.FaceRectangle.Width}, " +
                  $"{face.FaceRectangle.Top + face.FaceRectangle.Height}"));
            }
            res.Add(await GetStatus());
        }

        // 成人或不雅内容
        if (null != results.Adult)
        {

            res.Add(await GetStatus("成人或不雅内容:"));

            if (results.Adult.IsAdultContent)
                res.Add(await GetStatus($"有成人内容: {results.Adult.IsAdultContent} 可信度 {results.Adult.AdultScore:P2}"));

            if (results.Adult.IsRacyContent)
                res.Add(await GetStatus($"有不雅内容: {results.Adult.IsRacyContent} 可信度 {results.Adult.RacyScore:P2}"));

            if (results.Adult.IsGoryContent)
                res.Add(await GetStatus($"有血腥内容: {results.Adult.IsGoryContent} 可信度 {results.Adult.GoreScore:P2}"));

            res.Add(await GetStatus());
        }

        // 知名品牌
        if (null != results.Brands)
        {
            res.Add(await GetStatus("知名品牌:"));
            foreach (var brand in results.Brands)
            {
                res.Add(await GetStatus($"商标 {brand.Name} 可信度 {brand.Confidence:P2} 位置 {brand.Rectangle.X}, " +
                  $"{brand.Rectangle.X + brand.Rectangle.W}, {brand.Rectangle.Y}, {brand.Rectangle.Y + brand.Rectangle.H}"));
            }
            res.Add(await GetStatus());
        }

        // 名人形象
        if (null != results.Categories)
        {
            res.Add(await GetStatus("名人:"));
            foreach (var category in results.Categories)
            {
                if (category.Detail?.Celebrities != null)
                {
                    foreach (var celeb in category.Detail.Celebrities)
                    {
                        res.Add(await GetStatus($"{celeb.Name} 可信度 {celeb.Confidence:P2} 位置 {celeb.FaceRectangle.Left}, " +
                          $"{celeb.FaceRectangle.Top}, {celeb.FaceRectangle.Height}, {celeb.FaceRectangle.Width}"));
                    }
                }
            }
            res.Add(await GetStatus());
        }

        // 图像中的热门地标（如果有）。
        if (null != results.Categories)
        {
            res.Add(await GetStatus("地标:"));
            foreach (var category in results.Categories)
            {
                if (category.Detail?.Landmarks != null)
                {
                    foreach (var landmark in category.Detail.Landmarks)
                    {
                        res.Add(await GetStatus($"{landmark.Name} 可信度 {landmark.Confidence:P2}"));
                    }
                }
            }
            res.Add(await GetStatus());
        }

        //标识配色方案。
        if (null != results.Color)
        {
            res.Add(await GetStatus("配色方案:"));
            res.Add(await GetStatus("是黑白照片: " + results.Color.IsBWImg));
            res.Add(await GetStatus("强调色: " + results.Color.AccentColor));
            res.Add(await GetStatus("主背景色: " + results.Color.DominantColorBackground));
            res.Add(await GetStatus("主前景颜色: " + results.Color.DominantColorForeground));
            res.Add(await GetStatus("主色调: " + string.Join(",", results.Color.DominantColors)));
            res.Add(await GetStatus());
        }

        // 检测图像类型。
        if (null != results.ImageType)
        {
            res.Add(await GetStatus("图像类型:"));
            res.Add(await GetStatus("剪贴画类型: " + results.ImageType.ClipArtType));
            res.Add(await GetStatus("画线类型: " + results.ImageType.LineDrawingType));
            res.Add(await GetStatus());
        }

        return res;

    }

    #endregion

    /// <summary>
    /// 检测图像中的对象 - 本地图像
    /// <para></para> 这是检测对象的替代方法，而不是通过分析图像进行检测.
    /// </summary>       
    /// <param name="urlImage">URL</param> 
    /// <param name="stream">流</param> 
    /// <param name="localImage">本地图片文件</param> 
    /// <returns></returns>
    public async Task<List<string>> DetectObjects(string? urlImage = null, Stream? stream = null, string? localImage = null)
    {
        var res = new List<string>
        {
            await GetStatus("----------------------------------------------------------"),
            await GetStatus($"检测对象 -  {Desc(urlImage, stream, localImage)}"),
            await GetStatus()
        };

        if (stream == null && !string.IsNullOrEmpty(localImage))
        {
            // 检测本地图像中特定于域的内容。
            stream = File.OpenRead(localImage);
        }

        // 使用本地文件调用计算机视觉服务
        DetectResult results = (stream == null) ? await Client.DetectObjectsAsync(urlImage) : await Client.DetectObjectsInStreamAsync(stream);

        res.Add(await GetStatus($"检测图像中的物体 {Path.GetFileName(localImage)}..."));
        res.Add(await GetStatus());

        // 对于图片中的每个检测到的对象，打印出检测到的边界对象、该检测的置信度和图像中的边界框
        res.Add(await GetStatus("检测对象:"));
        foreach (var obj in results.Objects)
        {
            res.Add(await GetStatus($"{obj.ObjectProperty} 可信度 {obj.Confidence:P2} 位置 {obj.Rectangle.X}, " +
              $"{obj.Rectangle.X + obj.Rectangle.W}, {obj.Rectangle.Y}, {obj.Rectangle.Y + obj.Rectangle.H}"));
        }
        res.Add(await GetStatus());

        return res;
    }

    /// <summary>
    /// 检测 URL 图像中的地标或名人
    /// <para></para>检测特定领域的内容
    ///<para></para> 识别图像中的地标或名人。
    /// </summary>
    /// <param name="client">客户端</param>
    /// <param name="urlImage">URL</param> 
    /// <param name="stream">流</param> 
    /// <param name="localImage">本地图片文件</param> 
    /// <returns></returns>
    public async Task<List<string>> DetectDomainSpecific(string? urlImage = null, Stream? stream = null, string? localImage = null)
    {
        var res = new List<string>
        {
            await GetStatus("----------------------------------------------------------"),
            await GetStatus($"检测域特定内容 -  {Desc(urlImage, stream, localImage)}"),
            await GetStatus()
        };

        if (!string.IsNullOrEmpty(urlImage))
        {
            // 检测 URL 图像中特定于域的内容。
            DomainModelResults resultsUrl = await Client.AnalyzeImageByDomainAsync("landmarks", urlImage);
            // 显示结果。
            var jsonUrl = JsonConvert.SerializeObject(resultsUrl.Result);
            JObject resultJsonUrl = JObject.Parse(jsonUrl);
            if (resultJsonUrl["landmarks"].Any())
            {
                res.Add(await GetStatus($"检测到地标: {resultJsonUrl["landmarks"][0]["name"]} " +
                    $"可信度 {resultJsonUrl["landmarks"][0]["confidence"]:P2}."));
            }
            res.Add(await GetStatus());
        }

        if (stream == null && !string.IsNullOrEmpty(localImage))
        {
            // 检测本地图像中特定于域的内容。
            stream = File.OpenRead(localImage);
        }

        if (stream != null)
        {
            try
            {
                // 如果您感兴趣，请将“名人”更改为“地标”。
                DomainModelResults resultsLocal = await Client.AnalyzeImageByDomainInStreamAsync("celebrities", stream);
                res.Add(await GetStatus($"在本地图像中检测名人 {Path.GetFileName(localImage)}..."));
                // 显示结果。
                var jsonLocal = JsonConvert.SerializeObject(resultsLocal.Result);
                JObject resultJsonLocal = JObject.Parse(jsonLocal);
                if (resultJsonLocal["celebrities"].Any())
                {
                    res.Add(await GetStatus($"检测到名人: {resultJsonLocal["celebrities"][0]["name"]} " +
                      $"可信度 {resultJsonLocal["celebrities"][0]["confidence"]:P2}"));
                }
            }
            catch (Exception e)
            {
                res.Add(await GetStatus($"检测名人出错: {e.Message}"));
            }
            res.Add(await GetStatus());
        }

        return res;
    }

    /// <summary>
    /// 从 URL 和本地图像生成缩略图
    /// <para></para>接受 URL 和本地图像，此示例将生成具有指定宽度/高度（像素）的缩略图。
    /// <para></para>缩略图将保存在本地。
    /// </summary>
    /// <param name="urlImage">URL</param> 
    /// <param name="stream">流</param> 
    /// <param name="localImage">本地图片文件</param> 
    /// <returns></returns>
    public async Task<List<string>> GenerateThumbnail(string? urlImage = null, Stream? stream = null, string? localImage = null)
    {
        var res = new List<string>
        {
            await GetStatus("----------------------------------------------------------"),
            await GetStatus($"生成缩略图 - {Desc(urlImage, stream, localImage)}"),
            await GetStatus()
        };
        if (stream == null && !string.IsNullOrEmpty(localImage))
        {
            // 检测本地图像中特定于域的内容。
            stream = File.OpenRead(localImage);
        }

        // 缩略图将本地保存在此项目的 bin\Debug\netcoreappx.x\ 文件夹中。
        string localSavePath = @".";

        // 将 smart Cropping 设置为 true 可使图像调整其纵横比
        // 以图像中感兴趣的区域为中心。如果需要，更改宽度/高度。
        Stream thumbnailUrl = (stream == null) ? await Client.GenerateThumbnailAsync(60, 60, urlImage, true) : await Client.GenerateThumbnailInStreamAsync(100, 100, stream, smartCropping: true);

        string imageNameUrl = Path.GetFileName(urlImage ?? "temp.jpg");
        string thumbnailFilePathUrl = Path.Combine(localSavePath, imageNameUrl.Insert(imageNameUrl.Length - 4, "_thumb"));

        res.Add(await GetStatus("将缩略图从 URL 图像保存到 " + thumbnailFilePathUrl));
        using (Stream file = File.Create(thumbnailFilePathUrl)) { thumbnailUrl.CopyTo(file); }

        res.Add(await GetStatus());

        return res;
    }

    private string Desc(string? urlImage, Stream? stream, string? localImage) => urlImage != null ? Path.GetFileName(urlImage) : (stream != null ? "文件流" : localImage ?? "");
}

