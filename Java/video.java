/**
 * @Description: 获取视频信息
 * @param realPath  void
 */
public static Map<String, Object> getVideoInfo(String realPath) {
  File source = new File(realPath);
  Encoder encoder = new Encoder();
  FileChannel fc = null;
  String size = "";
  Map<String, Object> result = new HashMap<String, Object>();
  try {
    it.sauronsoftware.jave.MultimediaInfo m = encoder.getInfo(source);
    long ls = m.getDuration();
    System.out.println("此视频时长为:" + ls / 60000 + "分" + (ls) / 1000 + "秒！");
    // 视频帧宽高
    System.out.println("此视频高度为:" + m.getVideo().getSize().getHeight());
    System.out.println("此视频宽度为:" + m.getVideo().getSize().getWidth());
    System.out.println("此视频格式为:" + m.getFormat());
    result.put("videoHigh", m.getVideo().getSize().getHeight());
    result.put("videoWide", m.getVideo().getSize().getWidth());
    result.put("format", m.getFormat());
    fis = new FileInputStream(source);
    fc = fis.getChannel();
    BigDecimal fileSize = new BigDecimal(fc.size());
    size = fileSize.divide(new BigDecimal(1048576), 2, RoundingMode.HALF_UP) + "MB";
    System.out.println("此视频大小为" + size);
    result.put("size", size);
    return result;
  } catch (Exception e) {
    e.printStackTrace();
    return result;
  } finally {
    if (null != fc) {
      try {
        fc.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}

/**
 * @Description: 截取视频第几帧生成图片
 * @param videoPath 视频路径
 * @param frame  第几帧
 * @return  String 图片的相对路劲
 */
public static String processImg(String videoPath, String frame) {
  File file = new File(videoPath);
  if (!file.exists()) {
    System.err.println("路径[" + videoPath + "]对应的视频文件不存在!");
    return null;
  }
  List<String> commands = new java.util.ArrayList<String>();
  commands.add(utilPath);
  commands.add("-i");
  commands.add(videoPath);
  commands.add("-y");
  commands.add("-f");
  commands.add("image2");
  commands.add("-ss");
  commands.add(frame); // 这个参数是设置截取视频多少秒时的画面
  commands.add("-t");
  commands.add("0.001");
  commands.add("-s");
  commands.add("800x1200");// 宽X高
  String imgPath = videoPath.substring(0, videoPath.lastIndexOf(".")).replaceFirst("vedio", "file") + ".jpg";
  commands.add(imgPath);
  try {
    ProcessBuilder builder = new ProcessBuilder();
    builder.command(commands);
    builder.start();
    System.out.println("截取成功");
    return imgPath;
  } catch (Exception e) {
    e.printStackTrace();
    return null;
  }
}

