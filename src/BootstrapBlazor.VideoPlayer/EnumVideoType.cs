// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 播放类型
/// </summary>
public enum EnumVideoType
{
    [Description("video/ogg")]
    opus,
    [Description("video/ogg")]
    ogv,
    [Description("video/mp4")]
    mp4,
    [Description("video/mp4")]
    mov,
    [Description("video/mp4")]
    m4v,
    [Description("video/x-matroska")]
    mkv,
    [Description("audio/mp4")]
    m4a,
    [Description("audio/mpeg")]
    mp3,
    [Description("audio/aac")]
    aac,
    [Description("audio/x-caf")]
    caf,
    [Description("audio/flac")]
    flac,
    [Description("audio/ogg")]
    oga,
    [Description("audio/wav")]
    wav,
    [Description("application/x-mpegURL")]
    m3u8,
    [Description("application/dash+xml")]
    mpd,
    [Description("image/jpeg")]
    jpg,
    [Description("image/jpeg")]
    jpeg,
    [Description("image/gif")]
    gif,
    [Description("image/png")]
    png,
    [Description("image/svg+xml")]
    svg,
    [Description("image/webp")]
    webp,

}
//11 :   opus: 'video/ogg',
//12 :   ogv: 'video/ogg',
//13 :   mp4: 'video/mp4',
//14 :   mov: 'video/mp4',
//15 :   m4v: 'video/mp4',
//16 :   mkv: 'video/x-matroska',
//17 :   m4a: 'audio/mp4',
//18 :   mp3: 'audio/mpeg',
//19 :   aac: 'audio/aac',
//20 :   caf: 'audio/x-caf',
//21 :   flac: 'audio/flac',
//22 :   oga: 'audio/ogg',
//23 :   wav: 'audio/wav',
//24 :   m3u8: 'application/x-mpegURL',
//25 :   mpd: 'application/dash+xml',
//26 :   jpg: 'image/jpeg',
//27 :   jpeg: 'image/jpeg',
//28 :   gif: 'image/gif',
//29 :   png: 'image/png',
//30 :   svg: 'image/svg+xml',
//31 :   webp: 'image/webp'

//     <source src = "rtmp://rtc.qiscus.com:2935/live360p/testing123&testing.mp4" type="rtmp/mp4">
//  </source>

//    rtmp/mp4
