// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.Components;
using System.ComponentModel;
using System.Reflection;

namespace BootstrapBlazor.AzureServices;

public partial class Enums
{
    /// <summary>
    /// 语音名称
    /// </summary>
    public enum AzureVoiceName
    {
        [Description("en-US-AriaNeural")]
        en_US_AriaNeural,
        [Description("en-US-JennyNeural")]
        en_US_JennyNeural,
        [Description("en-US-GuyNeural")]
        en_US_GuyNeural,

        [Description("es-ES-AbrilNeural")]
        es_ES_AbrilNeural,

        //[Description("es-ES-HelenaRUS")]
        //es_ES_HelenaRUS,
        [Description("es-ES-AlvaroNeural")]
        es_ES_AlvaroNeural,
        //[Description("es-ES-Laura")]
        //es_ES_Laura,
        //[Description("es-ES-Pablo")]
        //es_ES_Pablo,

        [Description("es-ES-ElviraNeural")]
        es_ES_ElviraNeural,

        [Description("zh-CN-XiaoxiaoNeural")]
        zh_CN_XiaoxiaoNeural,
        [Description("zh-CN-XiaomoNeural")]
        zh_CN_XiaomoNeural,

        [Description("zh-HK-HiuGaaiNeural")]
        zh_HK_HiuGaaiNeural,

        [Description("zh-HK-WanLungNeural")]
        zh_HK_WanLungNeural,

        [Description("fr-FR-BrigitteNeural")]
        fr_FR_BrigitteNeural,

        [Description("ca-ES-AlbaNeural")]
        ca_ES_AlbaNeural,

        [Description("pt-PT-FernandaNeural")]
        pt_PT_FernandaNeural,

        [Description("it-IT-FabiolaNeural")]
        it_IT_FabiolaNeural,

        [Description("de-DE-AmalaNeural")]
        de_DE_AmalaNeural,

        [Description("pl-PL-AgnieszkaNeural")]
        pl_PL_AgnieszkaNeural,
    }

    /// <summary>
    /// 风格
    /// </summary>
    public enum AzureVoiceStyle
    {
        sad,
        calm,
        customerservice
    }
    public enum AzureVoiceRole
    {
        YoungAdultFemale,
        OlderAdultMale
    }
}

/// <summary>
/// Enum 扩展方法
/// </summary>
internal static class EnumExtensions
{

    /// <summary>
    /// 获取枚举的值和描述
    /// </summary>
    /// <param name="en"></param>
    /// <returns></returns>
    public static string GetEnumName(this Enum en) => en.GetDescription();

    /// <summary>
    /// 获取枚举的值和描述
    /// </summary>
    /// <param name="en"></param>
    /// <returns></returns>

    public static string GetDescription(this Enum en)
    {
        Type temType = en.GetType();
        MemberInfo[] memberInfos = temType.GetMember(en.ToString());
        if (memberInfos != null && memberInfos.Length > 0)
        {
            object[] objs = memberInfos[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
            if (objs != null && objs.Length > 0)
            {
                return ((DescriptionAttribute)objs[0]).Description;
            }
        }
        return en.ToString();
    }

    public static string[] GetNamesFromEnums(this Type enumType)
    {
        string[] t1 = Enum.GetNames(enumType);
        return t1;
    }

    public static IEnumerable<SelectedItem> EnumsToSelectedItem(this Type enumType)
    {
        foreach (var item in Enum.GetNames(enumType))
        {
            yield return new SelectedItem(item, item.Replace("_", "-"));
        }
    }

}


public static class Demos
{

    public static IEnumerable<SelectedItem> ListToSelectedItem()
    {
        var index = 0;
        foreach (var item in DemoSsml)
        {
            index++;
            yield return new SelectedItem(item, "demo" + index);
        }
    }

    public static List<string> DemoSsml = new List<string> {
        @"<speak xmlns=""http://www.w3.org/2001/10/synthesis"" xmlns:mstts=""http://www.w3.org/2001/mstts"" xmlns:emo=""http://www.w3.org/2009/10/emotionml"" version=""1.0"" xml:lang=""zh-CN""><voice name=""Microsoft Server Speech Text to Speech Voice (zh-CN, XiaoxiaoNeural)""><mstts:express-as style=""lyrical"" styledegree=""0.8""><s /><prosody rate=""-5.00%"" pitch=""+2.00%"" contour=""(49%, +11%)"">我们</prosody><prosody rate=""-5.00%"" pitch=""+2.00%"">-是这个国家的</prosody><prosody rate=""-5.00%"" pitch=""+2.00%"" contour=""(49%, +35%)"">记录</prosody><prosody rate=""-5.00%"" pitch=""+2.00%"">者，</prosody></mstts:express-as><s />
<mstts:express-as style=""lyrical"" styledegree=""0.8""><s /><prosody rate=""-5.00%"" pitch=""+2.00%"">也是她走向太空的</prosody><prosody rate=""-5.00%"" pitch=""+2.00%"" contour=""(21%, +61%) (62%, +15%)"">见证</prosody><prosody rate=""-5.00%"" pitch=""+2.00%"">者。</prosody></mstts:express-as><s />
<mstts:express-as style=""lyrical"" styledegree=""0.8""><prosody rate=""-5.00%"" pitch=""+1.00%"">记载中国人送往宇宙的</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"" contour=""(49%, +16%)"">第一次</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">问候，聆听中国人发自太空的-第一次</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"" contour=""(48%, +8%)"">宣言</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">。</prosody></mstts:express-as></voice>
<voice name=""zh-CN-XiaoxiaoNeural""><s /><mstts:express-as style=""lyrical""><prosody pitch=""+1.00%"">同喜悦，同悲伤，共艰辛</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">，共</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"" contour=""(50%, +16%)"">荣耀</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">。</prosody></mstts:express-as><s /></voice>
<voice name=""zh-CN-XiaoqiuNeural""><prosody pitch=""+1.00%"">每当</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">航天员</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"" contour=""(50%, +20%)"">归来</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">，我们总是</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"" contour=""(50%, +31%)"">最早</prosody><prosody rate=""-5.00%"" pitch=""+1.00%"">陪伴在身边。</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"">我们也要成为这次远征的</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"" contour=""(50%, +25%)"">参与</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"">者。90年沉淀的文化与</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"" contour=""(50%, +23%)"">传统</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"">，被</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"" contour=""(50%, +14%)"">技术</prosody><prosody rate=""+3.00%"" pitch=""+1.00%"">所</prosody><prosody rate=""-3.00%"" pitch=""+1.00%"" contour=""(49%, -16%)"">赋</prosody><prosody rate=""-3.00%"" pitch=""+1.00%"" contour=""(49%, +31%)"">能</prosody><prosody rate=""+1.00%"" pitch=""+1.00%"">。</prosody></voice>
<voice name=""zh-CN-XiaoxiaoNeural""><mstts:express-as style=""lyrical"" styledegree=""0.8""><prosody rate=""-4.00%"" pitch=""+2.00%"">越银河而至</prosody><prosody rate=""-4.00%"" pitch=""+2.00%"" contour=""(49%, +19%)"">九天外</prosody><prosody rate=""-4.00%"" pitch=""+2.00%"">，
使无穷</prosody><prosody rate=""-4.00%"" pitch=""+2.00%"" contour=""(50%, +25%)"">远方</prosody><prosody rate=""-4.00%"" pitch=""+2.00%"">-终有</prosody><prosody rate=""-4.00%"" pitch=""+2.00%"" contour=""(51%, +10%)"">尽头</prosody><prosody rate=""-4.00%"" pitch=""+2.00%"">。</prosody>
<prosody rate=""-4.00%"" volume=""+10.00%"" pitch=""+2.00%"">使</prosody><prosody rate=""-6.00%"" volume=""+10.00%"" pitch=""+2.00%"" contour=""(51%, +25%)"">浩瀚无垠</prosody><prosody rate=""-4.00%"" volume=""+10.00%"" pitch=""+2.00%"">，</prosody><prosody rate=""-6.00%"" volume=""+10.00%"" pitch=""+2.00%"">终有</prosody><prosody rate=""-10.00%"" volume=""+10.00%"" pitch=""+2.00%"" contour=""(51%, +28%)"">边</prosody><prosody rate=""-13.00%"" volume=""+10.00%"" pitch=""+2.00%"" contour=""(51%, +28%)"">界</prosody><prosody rate=""-4.00%"" volume=""+10.00%"" pitch=""+2.00%"">。</prosody></mstts:express-as></voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"zh-CN\"><voice name=\"zh-CN-YunyangNeural\">今日大盘，由云扬为您播报。\r\n高位股<mstts:ttsbreak strength=\"none\" />现<prosody contour=\"(50%, +35%)\">分歧</prosody>，低位-大市值<prosody contour=\"(50%, +39%)\">崛起</prosody>，应<prosody rate=\"+4.00%\">如何</prosody><prosody contour=\"(50%, +37%)\">操作</prosody>？\r\n一、盘前策略。\r\n昨天指数全天震荡<prosody contour=\"(50%, +37%)\">走弱</prosody>，市场<mstts:ttsbreak strength=\"none\" />分歧<prosody contour=\"(50%, +40%)\">加大</prosody>，个股普跌，涨幅超9％ -<prosody contour=\"(51%, +35%)\">个股</prosody>仅50余家，市场<mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\">赚钱效应</prosody>较差。板块上，白酒、军工、锂电、光伏等<prosody rate=\"+4.00%\">高位</prosody><prosody rate=\"+8.00%\">抱团</prosody><prosody rate=\"+13.00%\">板块</prosody>集体<prosody contour=\"(50%, +40%)\">下挫</prosody>，三一重工、金龙鱼等抱团股-分歧加剧，资金开始高低位切换，5G、半导体等<prosody contour=\"(50%, +41%)\"><prosody rate=\"+5.00%\">科技</prosody></prosody><prosody rate=\"+5.00%\">方向</prosody>发力。北方华创、长电科技、兆易创新、中兴通讯<prosody rate=\"+7.00%\">等股-</prosody>大涨。此外，低位大市值的中国中车等-<prosody contour=\"(50%, +39%)\"><prosody rate=\"+5.00%\">中字</prosody></prosody><prosody rate=\"+5.00%\">头</prosody>股票也受资金青睐。稀土、航运-、天然气等板块-盘中拉升，但前<phoneme alphabet=\"sapi\" ph=\"yi 2\">一</phoneme>日<prosody rate=\"+5.00%\">带领指数</prosody>冲关的券商-<prosody contour=\"(50%, +40%)\">持续</prosody>性差。盘面上，中字头、航运、油气设服<prosody rate=\"+7.00%\">等</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\">板块</prosody>涨幅居前，注册制次新、证券、农业等板块跌幅居前。</voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"zh-CN\"><voice name=\"zh-CN-XiaoyanNeural\"><prosody pitch=\"-10.00%\" contour=\"(62%, +32%)\"><phoneme alphabet=\"sapi\" ph=\"wei 2\">喂</phoneme></prosody>，你好。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">哎你好，我刚才接到这个电话<mstts:ttsbreak strength=\"none\" />打来的，然后我想问一下是有什么包裹吗，还是什么<prosody contour=\"(52%, -51%)\">东西</prosody>。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">哦，您是要查包裹对吗？</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+10.00%\">呃对，刚接到这个电话-他说我有个包裹，但是我不确定，因为我没有寄东西。</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\"><prosody rate=\"+5.00%\">嗯，我这里是总机，刚刚可能是</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\">分机</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\">给您去的电话吧？</prosody></voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+10.00%\">对，然后他叫</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+10.00%\">我打这个电话。</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\"><prosody rate=\"+5.00%\">嗯，那这样吧，麻烦您提供一下姓名，我帮您查一下。</prosody></voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">嗯是晓辰。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">哪个<prosody contour=\"(46%, +11%)\">辰</prosody>？</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+10.00%\">辰是时辰的</prosody><prosody rate=\"+10.00%\" contour=\"(49%, -30%)\">辰</prosody><prosody rate=\"+10.00%\">，晓是那个破晓的晓。</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\"><prosody rate=\"+5.00%\">嗯好的，您稍等一下好吗？我刚才帮您看了一下，确实有一份由晓辰姓名签收的包裹。号码是一二三-四五六七-八九八七，这是您本人吗？</prosody></voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">嗯是的，是我本人。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">嗯，因为这个包裹当时是由于地址不详，<prosody rate=\"+3.00%\">没有办法准确投递。</prosody><prosody rate=\"+5.00%\">这样您把这个详细地址跟我讲一下，我马上安排工作人员给您送过去好吗</prosody>?</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+10.00%\">哦，我现在在出差。不过也没关系，我到时候找人帮我签收，然后写我名字就可以了，是吧？</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">嗯，对的。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+5.00%\">寄到鼓楼</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\">大街1号吧。</prosody><prosody rate=\"+10.00%\">那能查到</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+10.00%\">是谁寄的吗？</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">上面没有写的。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">啊那好吧。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">哦，不过这个包裹显示是从北京寄出的。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">呃您稍等一下哈。<phoneme alphabet=\"sapi\" ph=\"ei 2\">诶</phoneme>，<prosody rate=\"+10.00%\">是从中关村寄出的</prosody><prosody rate=\"+10.00%\" contour=\"(45%, -27%)\">吗</prosody><prosody rate=\"+10.00%\">？</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">嗯，是的。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+8.00%\">啊，那我知道了。就是我可不可以报</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+8.00%\">一个电话号码给你，然后叫派送的</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+8.00%\">工作人员</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+8.00%\">直接</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+8.00%\" contour=\"(20%, -34%) (57%, +33%)\">跟这个</prosody><prosody rate=\"+8.00%\">人联系，可以吗？</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">您说的这个人是也是在原来的地址是吧？</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+8.00%\">对，你到时候跟她联系的话，</prosody><prosody rate=\"+10.00%\">就直接送过去，</prosody>拿给她就行。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">嗯，好的。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\"><prosody rate=\"+4.00%\">好谢谢你呀，那有什么问题我还是可以打这个电话对吗？</prosody></voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\"><prosody rate=\"+5.00%\">对的，</prosody><prosody rate=\"+8.00%\">没问题</prosody><prosody rate=\"+5.00%\">。</prosody></voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">谢谢哈，给您添麻烦了。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\">嗯，不客气。</voice>\r\n<voice name=\"zh-CN-XiaochenNeural\">哎那再见哈。</voice>\r\n<voice name=\"zh-CN-XiaoyanNeural\"><prosody rate=\"+5.00%\">麻烦您对我的服务进行评价，再见。</prosody></voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"zh-CN\"><voice name=\"zh-CN-XiaoxiaoNeural\"><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+8.00%\" pitch=\"+2.00%\">想导航</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">去</prosody><prosody rate=\"+6.00%\" pitch=\"+2.00%\">哪里</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">？</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+7.00%\" pitch=\"+2.00%\">一起</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(51%, +19%)\">听歌</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">吧。</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+7.00%\" pitch=\"+2.00%\">深圳今天天气晴-气温34度，相对湿度</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+7.00%\" pitch=\"+2.00%\">70%，东北风3级。</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+8.00%\" pitch=\"+2.00%\">好的</prosody><prosody rate=\"+7.00%\" pitch=\"+2.00%\">，座椅加热已打开。</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+5.00%\" pitch=\"+2.00%\">网络</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\" pitch=\"+2.00%\">有点差呢，要不-过一会儿再试吧。</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(49%, +3%)\">连接</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">了手机</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(50%, +19%)\">蓝牙</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">才能打电话哦，在</prosody><prosody rate=\"+8.00%\" pitch=\"+2.00%\">搜索列表</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\" pitch=\"+2.00%\">点击你的手机-即可</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(52%, -17%)\">连接</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">。</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+5.00%\" pitch=\"+2.00%\">空调已打开，当前</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\" pitch=\"+2.00%\">为除霜模式，主驾</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(33%, +3%)\">24度</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">，副驾22度。</prosody></mstts:express-as><s />\r\n<mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+5.00%\" pitch=\"+2.00%\">已为您规划好</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+5.00%\" pitch=\"+2.00%\">到-番禺路300弄-假日苑B座的路线。</prosody></mstts:express-as>\r\n<s /><mstts:express-as style=\"chat\" styledegree=\"1.5\"><prosody rate=\"+5.00%\" pitch=\"+2.00%\">晓晓</prosody><prosody rate=\"+7.00%\" pitch=\"+2.00%\">也有点</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(50%, +15%)\">冷</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\" contour=\"(50%, -19%)\">呢</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">，帮你</prosody><prosody rate=\"+3.00%\" pitch=\"+2.00%\">调高温度-</prosody><prosody rate=\"+5.00%\" pitch=\"+2.00%\">到26度啦</prosody><mstts:ttsbreak strength=\"strong\" boundarytone=\"H-\" /><prosody rate=\"+5.00%\" pitch=\"+2.00%\">。</prosody></mstts:express-as><s /></voice>\r\n<voice name=\"zh-CN-YunxiNeural\"><s /><mstts:express-as role=\"Default\" style=\"Default\"><prosody rate=\"+3.00%\">想导航去哪里？</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"assistant\"><prosody rate=\"+3.00%\">一起听歌吧。</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"newscast\"><prosody rate=\"+3.00%\">深圳今天天气晴-气温34度，相对湿度70%，东北风3级。</prosody></mstts:express-as><s />\r\n<mstts:express-as style=\"assistant\"><prosody rate=\"+3.00%\">网络有点差呢，要不-过一会儿再试吧。</prosody></mstts:express-as><s />\r\n<mstts:express-as style=\"assistant\"><prosody rate=\"+3.00%\">空调已打开，当前为除霜模式，主驾24度，副驾22度。</prosody></mstts:express-as><s /></voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"zh-CN\"><voice name=\"zh-CN-XiaoxiaoNeural\"><mstts:express-as style=\"lyrical\"><prosody rate=\"+3.00%\">且说</prosody>宝玉<prosody rate=\"+3.00%\">正和</prosody>宝钗玩笑，<prosody rate=\"+5.00%\">忽见</prosody>人说-<prosody pitch=\"+5.00%\">史</prosody><prosody rate=\"+4.00%\">大</prosody>姑娘<prosody pitch=\"+5.00%\">来</prosody>了。宝钗<prosody rate=\"+4.00%\">笑道</prosody>：</mstts:express-as></voice>\r\n<voice name=\"zh-CN-XiaohanNeural\"><mstts:express-as style=\"cheerful\">”等着，咱们两个一起走，<prosody rate=\"+5.00%\" pitch=\"+6.00%\">瞧瞧</prosody><prosody contour=\"(49%, -11%)\">他</prosody><prosody rate=\"+6.00%\"><phoneme alphabet=\"sapi\" ph=\"qu 5\">去</phoneme></prosody>。”</mstts:express-as></voice>\r\n<voice name=\"zh-CN-XiaoxiaoNeural\"><mstts:express-as style=\"lyrical\">说着，下了炕，和宝玉<mstts:ttsbreak strength=\"none\" />来至贾母这边。<prosody rate=\"+5.00%\">只</prosody><prosody rate=\"+7.00%\">见</prosody>史湘云<prosody rate=\"+4.00%\">大说大笑的</prosody>，见了他两个，忙站<prosody rate=\"+5.00%\">起来</prosody>问好。<prosody rate=\"+5.00%\">正值</prosody>黛玉在旁，因问宝玉：</mstts:express-as>\r\n<mstts:express-as style=\"gentle\">“<prosody rate=\"+5.00%\">打</prosody><prosody pitch=\"+3.00%\">哪里</prosody>来？”</mstts:express-as>\r\n<mstts:express-as style=\"lyrical\">宝玉<prosody rate=\"+4.00%\">便</prosody><prosody pitch=\"+7.00%\">说</prosody>：</mstts:express-as></voice>\r\n<voice name=\"zh-CN-YunxiNeural\"><mstts:express-as style=\"Calm\">“<phoneme alphabet=\"sapi\" ph=\"da 3\">打</phoneme><prosody pitch=\"+5.00%\"><phoneme alphabet=\"sapi\" ph=\"bao 2\">宝</phoneme></prosody>姐姐<prosody rate=\"+3.00%\">那里</prosody>来。”</mstts:express-as></voice>\r\n<voice name=\"zh-CN-XiaoxiaoNeural\"><mstts:express-as style=\"lyrical\">黛玉冷笑道：</mstts:express-as>\r\n<mstts:express-as style=\"disgruntled\" styledegree=\"1.5\">“我<prosody contour=\"(49%, -11%)\">说</prosody>呢，亏了绊<prosody rate=\"+5.00%\">住</prosody>，不然-<prosody contour=\"(60%, +19%)\">早</prosody>就<prosody contour=\"(60%, -11%)\">飞</prosody>了来了。”</mstts:express-as></voice>\r\n<voice name=\"zh-CN-YunxiNeural\"><mstts:express-as style=\"Embarrassed\"><prosody rate=\"+3.00%\">“只许</prosody><mstts:ttsbreak strength=\"none\" /><prosody rate=\"+3.00%\">和你玩，替你解闷</prosody>，不过<prosody pitch=\"+5.00%\">偶然</prosody>到他那里，就说这些闲话。”</mstts:express-as></voice>\r\n<voice name=\"zh-CN-XiaoxiaoNeural\"><mstts:express-as style=\"angry\" styledegree=\"1.3\"><prosody volume=\"+50.00%\">“好没意思的</prosody><prosody rate=\"-4.00%\" volume=\"+50.00%\">话</prosody><prosody volume=\"+50.00%\">！去不去,</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\">关</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\" contour=\"(60%, +21%)\">我</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\">什么</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\" contour=\"(60%, -14%)\">事儿</prosody><prosody volume=\"+50.00%\">？</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\">又没叫你</prosody><prosody rate=\"+5.00%\" volume=\"+50.00%\">替</prosody><prosody rate=\"+5.00%\" volume=\"+50.00%\" contour=\"(59%, +29%)\">我</prosody><prosody volume=\"+50.00%\">解闷儿，还</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\">许你</prosody><mstts:ttsbreak strength=\"none\" /><prosody volume=\"+50.00%\" pitch=\"+5.00%\">从此</prosody><prosody volume=\"+50.00%\">不</prosody><prosody volume=\"+50.00%\" contour=\"(60%, +41%)\">理</prosody><prosody volume=\"+50.00%\" contour=\"(60%, +32%)\">我</prosody><prosody volume=\"+50.00%\">呢！”</prosody></mstts:express-as>\r\n<mstts:express-as style=\"lyrical\"><prosody rate=\"+4.00%\">说着</prosody>，<prosody rate=\"+4.00%\">便</prosody>赌气<mstts:ttsbreak strength=\"none\" />回房<prosody rate=\"+4.00%\">去了</prosody>。宝玉忙跟了来，问道：</mstts:express-as></voice>\r\n<voice name=\"zh-CN-YunxiNeural\"><mstts:express-as style=\"Calm\">“好好的<prosody pitch=\"+4.00%\">又</prosody>生气了！就是我说错了，你到底也还<prosody pitch=\"+5.00%\">坐</prosody>一会，合别人<prosody pitch=\"+5.00%\">说笑</prosody>一会<phoneme alphabet=\"sapi\" ph=\"zi 5\">子</phoneme>呀？”</mstts:express-as></voice>\r\n<voice name=\"zh-CN-XiaoxiaoNeural\"><mstts:express-as style=\"angry\" styledegree=\"1.4\"><prosody volume=\"+50.00%\">“</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\">你</prosody><prosody rate=\"+4.00%\" volume=\"+50.00%\" pitch=\"+5.00%\" contour=\"(60%, +33%)\"><phoneme alphabet=\"sapi\" ph=\"guan 2\">管</phoneme></prosody><prosody rate=\"+6.00%\" volume=\"+50.00%\" contour=\"(60%, +24%)\">我</prosody><prosody rate=\"+3.00%\" volume=\"+50.00%\">呢</prosody><prosody volume=\"+50.00%\">！”</prosody></mstts:express-as></voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"en-US\"><voice name=\"en-US-GuyNeural\"><s /><mstts:express-as style=\"newscast\">While we may experience some <prosody rate=\"-10.00%\" volume=\"+10.00%\">chillier-than-normal </prosody>weather to close out April, any brief flirtations with winterlike chill are in the past. <prosody contour=\"(16%, +0%) (29%, +39%) (40%, -1%) (87%, +28%)\">Thus, it is a good time to look back at our winter outlook.</prosody></mstts:express-as>\r\n<s /><mstts:express-as style=\"newscast\"><prosody contour=\"(11%, +2%) (19%, +32%) (23%, -1%) (63%, +0%) (80%, -29%)\">We always grade our winter outlooks,</prosody> even if the <prosody contour=\"(27%, -54%) (89%, +79%)\">results</prosody>aren’t pretty.</mstts:express-as>\r\n<s /><mstts:express-as style=\"newscast\">Taking a look at what we predicted in November, the results are mixed. It ended up being milder than we expected, primarily because of a very warm December. Our snowfall forecast was more successful, as we were in the <prosody pitch=\"+10.00%\">ballpark</prosody> of our <prosody contour=\"(21%, -42%) (77%, +3%)\">predicted ranges.</prosody></mstts:express-as><s /></voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"en-US\"><voice name=\"en-US-DavisNeural\"><s />This is the book for today: \"How to Astronaut: <break strength=\"weak\" />Everything You Need to Know Before Leaving Earth\",by Terry Virts.<s /><s />\r\n<s /><prosody rate=\"-10.00%\">Former NASA astronaut Terry Virts offers an insider's guide to astronauting and provides a behind-the-scenes look at the training, the basic rules, lessons, and procedures of space travel, including how to deal </prosody><prosody rate=\"-10.00%\" contour=\"(43%, -10%) (88%, -47%) (100%, +53%)\">with a dead body in space, </prosody><prosody rate=\"-10.00%\">what it’s like to film an IMAX movie in orbit, what exactly to do when nature calls and much more</prosody><break strength=\"x-weak\" /><prosody rate=\"-10.00%\">, in 50 brief chapters.</prosody><s />\r\n<s />Why do you dream of becoming an astranaut?<s /> Let's hear the story from Ana.<s /></voice>\r\n<voice name=\"en-US-AnaNeural\"><prosody rate=\"-10.00%\">I have wanted to be an astronaut since I was a little kid.</prosody><prosody rate=\"-3.00%\">If I become an astronaut, </prosody><prosody rate=\"-3.00%\" contour=\"(23%, +16%) (40%, +46%) (56%, -2%) (72%, +61%) (97%, -25%)\">I will have a very exciting and adventurous life.</prosody><prosody rate=\"-3.00%\" contour=\"(35%, +36%) (95%, -19%)\"> I will see amazing things in space,</prosody><prosody rate=\"-3.00%\"> and </prosody><prosody rate=\"-3.00%\" contour=\"(13%, +40%) (45%, -21%) (96%, +10%)\">I may even meet aliens on other planets!</prosody>Some people think girls cannot be astronauts, <prosody contour=\"(11%, -25%) (46%, +20%) (73%, -15%)\">but I won't let anything stop me from following my dream!</prosody></voice></speak>",
    "<speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"en-US\"><voice name=\"en-US-NancyNeural\"><s /><mstts:express-as style=\"shouting\">\"We are friends now, I don't understand why you don't discuss your plans!\" ,</mstts:express-as><s /><mstts:express-as style=\"Default\"><prosody contour=\"(0%, -36%) (44%, -36%) (65%, -4%) (77%, +57%) (85%, +0%)\">I shouted.</prosody></mstts:express-as></voice>\r\n<voice name=\"en-US-DavisNeural\"><s /><mstts:express-as style=\"unfriendly\">\"<prosody contour=\"(4%, -1%) (49%, +0%) (76%, +49%) (83%, -27%)\">I needed to make certain</prosody><prosody contour=\"(63%, -5%) (76%, +54%) (85%, -4%)\"> you didn't attempt to harm me.</prosody>\"</mstts:express-as></voice>\r\n<voice name=\"en-US-NancyNeural\"><s /><mstts:express-as style=\"Default\"><prosody contour=\"(45%, -2%) (51%, +37%) (59%, -1%) (75%, -21%) (91%, +18%)\">I noticed he said \"attempt\" and not \"intend\",</prosody> I had no reason to harm him.</mstts:express-as><s /></voice> <voice name=\"en-US-NancyNeural\"><s /><mstts:express-as style=\"terrified\"><prosody rate=\"-15.00%\">\"I just wanted to help you,  </prosody><prosody rate=\"-15.00%\" contour=\"(8%, -4%) (18%, +4%) (28%, -30%) (82%, +43%) (94%, -11%)\">otherwise how can we escape from this planet?\"</prosody></mstts:express-as><s /></voice>\r\n<voice name=\"en-US-DavisNeural\"><s /><mstts:express-as style=\"sad\">\"I don't have a chance to think about it, <prosody contour=\"(39%, -1%) (44%, -21%) (76%, -23%) (93%, +37%)\">leave me alone please.</prosody>\"</mstts:express-as><s /></voice> <voice name=\"en-US-NancyNeural\"><s /><mstts:express-as style=\"Default\"><prosody contour=\"(19%, +3%) (58%, +3%) (67%, -23%) (95%, +23%)\">he said.</prosody></mstts:express-as><s />\r\n<s /><mstts:express-as style=\"Default\">I didn't answer, and I turned around and closed the door.</mstts:express-as><s /></voice></speak>"
    };
}
