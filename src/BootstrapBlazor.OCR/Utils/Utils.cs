// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.Text.RegularExpressions;

namespace BootstrapBlazor.OCR
{
    public class Utils
    {
        /// <summary>
        /// 转换 BrowserFileStream 到 MemoryStream
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static async Task<Stream> CopyStream(Stream input)
        {
            try
            {
                if (input.GetType().Name == "BrowserFileStream")
                {
                    var output = new MemoryStream();
                    byte[] buffer = new byte[16 * 1024];
                    int read;
                    while ((read = await input.ReadAsync(buffer, 0, buffer.Length)) > 0)
                    {
                        output.Write(buffer, 0, read);
                    }
                    return output;
                }
                else
                {
                    return input;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }




        /// <summary>
        /// 从 DataUrl 转换为 Stream
        /// <para>Convert from a DataUrl to an Stream</para>
        /// </summary>
        /// <param name="base64encodedstring"></param>
        /// <returns></returns>
        public static Stream DataUrl2Stream(string base64encodedstring)
        {
            var base64Data = Regex.Match(base64encodedstring, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            var bytes = Convert.FromBase64String(base64Data);
            var stream = new MemoryStream(bytes);
            return stream;
        }


        /// <summary>
        /// 从 base64 转换为 Stream
        /// <para>Convert from a base64 to an Stream</para>
        /// </summary>
        /// <param name="base64encodedstring"></param>
        /// <returns></returns>
        public static Stream Base642Stream(string base64encodedstring)
        {
            var bytes = Convert.FromBase64String(base64encodedstring);
            var stream = new MemoryStream(bytes);
            return stream;
        }

    }
}
