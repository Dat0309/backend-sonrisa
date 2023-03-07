const foodCategories = [
  {
    name: "Thịt ",
    description:
      "Thịt thực phẩm hay gọi thường là thịt là mô cơ của một số loài động vật như bò, lợn, gà được dùng làm thực phẩm cho con người.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666231943/20191120_085421_373104_thit-do.max-1800x1800_hknvrb.jpg",
  },
  {
    name: "Cá - Hải sản",
    description:
      "Hải sản, còn gọi là đồ biển, là tên gọi chỉ tất cả các sinh vật biển được chế biến thành món ăn như các loại cá biển, động vật giáp xác (cua và tôm), động vật thân mềm (mực, sò, hàu,…) và động vật da gai như nhím biển, động vật thủy sinh khác như sứa, thậm chí gồm cả rong biển và vi tảo.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666231993/13-1200x676_c4ln4v.jpg",
  },
  {
    name: "Rau - Củ - Quả",
    description:
      "Rau là tên gọi chung cho những bộ phận của thực vật được con người hay động vật dùng làm thực phẩm.Ý nghĩa này hiện vẫn được sử dụng phổ biến và áp dụng cho những thực vật có bộ phận ăn được, bao gồm hoa, quả, thân, lá, rễ và hạt",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666232091/Ki%E1%BB%83m-nghi%E1%BB%87m-rau-c%E1%BB%A7-qu%E1%BA%A3-2_dtptaw.png",
  },
  {
    name: "Trải cây - Quả mọng",
    description:
      "Quả mọng là loại quả tròn, nhỏ, mềm, có nhiều màu sắc khác nhau nhưng chủ yếu là màu xanh, đỏ và tím. Chúng có vị chua hoặc ngọt, thường được sử dụng để làm mứt hoặc món tráng miệng.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666232176/20210310_032754_080932_qua-mong-nuoc-1.max-1800x1800_jzw9ze.png",
  },
  {
    name: "Quả hạch và các loại hạt",
    description:
      'Trong thực vật học, quả hạch là một loại quả trong đó phần mềm (vỏ quả ngoài hay đơn giản gọi là vỏ, và vỏ quả giữa hay phần cùi thịt) ở bên ngoài bao bọc quanh một "hạt" (hạch hay hột) bao gồm lớp vỏ quả trong đã cứng lại cùng với hạt giống (một số trường hợp cũng gọi là nhân) ở bên trong.',
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666232282/qua-hach-la-qua-gi-cac-loai-qua-hach-loi-ich-cua-qua-hach-doi-voi-suc-khoe-202112271555120096_gw6tdm.jpg",
  },
  {
    name: "Ngũ cốc",
    description:
      "Ngũ cốc là tên gọi chung của loại thức phẩm được làm từ 5 loại hạt khác nhau được dân gian và Y học hiện đại nghiên cứu và khẳng định mang đến nhiều giá tri dinh dưỡng kể cả người già và trẻ nhỏ. Thông thường ngũ cốc nguyên hạt được làm từ 5 loại hạt thông dụng là: mè, gạo nếp, gạo tẻ, lúa mì và các loại đậu.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666232336/ngu-coc-la-gi-ngu-coc-nguyen-hat-la-gi-loai-nao-tot-cho-suc-khoe--760x367_y0hxqu.jpg",
  },
  {
    name: "Ăn kiêng",
    description:
      "Ăn kiêng là thực hành ăn thực phẩm theo cách được quy định và giám sát để giảm, duy trì hoặc tăng khối lượng cơ thể, hoặc để ngăn ngừa và điều trị các bệnh, như bệnh tiểu đường. Một chế độ ăn kiêng hạn chế thường được sử dụng bởi những người thừa cân hoặc béo phì, đôi khi kết hợp với tập thể dục, để giảm khối lượng cơ thể. Một số người theo chế độ ăn kiêng để tăng cân (thường ở dạng cơ bắp). Chế độ ăn kiêng cũng có thể được sử dụng để duy trì trọng lượng cơ thể ổn định và cải thiện sức khỏe.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666232417/Untitled-1-1200x643_sczoyv.jpg",
  },
  {
    name: "Trứng",
    description:
      "Trứng (miền Nam gọi là hột) là sản phẩm động vật từ các loại gia cầm,chim chóc thường được sử dụng làm nguồn thức ăn cung cấp protein cho người. Bề ngoài của trứng thường có hình bầu dục, hai đầu không cân bằng, một to một nhỏ.Các loại trứng phổ biến nhất là trứng gà,trứng vịt (trứng lộn),trứng chim cút (trứng cút) trứng ngỗng,trứng đà điểu...",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666234418/Article2917-636149900213668239_sywd7n.jpg",
  },
  {
    name: "Gia vị",
    description:
      "Các loại gia vị trong ẩm thực không những là thành phần quan trọng để tạo nên những món ăn thơm ngon, đầy đủ hương sắc mà còn mang đậm nét đặc trưng văn hóa của một quốc gia, dân tộc. ",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666236701/11-800x500-5_n1bdfb.jpg",
  },
];

export default foodCategories;
