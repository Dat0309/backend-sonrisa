const categories = [
  {
    name: "Bún - Mì - Phở",
    description:
      "Được làm từ bột gạo, bột mì, hoặc bột sắn hoặc bột gạo pha bột sắn cán thành tấm và cắt ra thành sợi to và ngắn với nước dùng được nấu từ tôm, cá, giò heo... thêm gia vị tùy theo từng loại",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666171815/375px-B%C3%A1nh_x%C3%A8o_with_n%C6%B0%E1%BB%9Bc_m%E1%BA%AFm_k1q1u1.jpg",
  },
  {
    name: "Cơm",
    description: "Cơm bình dân với nhiều món ăn đa dạng, phong phú",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666172030/com-nguoi-lam-mon-gi-ngon-202108240922557216_hhvlsp.jpg",
  },
  {
    name: "Ăn sáng",
    description:
      "Bữa sáng được xem là bữa quan trọng nhất trong ngày, tuy nhiên nhiều người lại có thói quen bỏ qua bữa ăn này. Hãy cùng tham khảo ngay những món ăn sáng ngon dễ nấu tại nhà sau để cung cấp đủ năng lượng cho các thành viên trong gia đình bạn.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666172876/_104706362_1df2aee2-0fb6-4571-ab4a-8caf3505b856_cj9o0s.jpg",
  },
  {
    name: "Ăn vặt",
    description:
      "Đồ ăn vặt có thể là những món rất nhiều đường như bánh quy, kẹo, bánh ngọt, chè đế những món nhiều chất béo bão hoà như khoai tây chiên, đồ chế biến sẵn. Cảm giác thoả mãn sau khi ăn đồ ngọt hay những món béo ngậy trôi qua, chúng sẽ để lại cho sức khoẻ bạn nhiều hậu quả trong cả ngắn và dài hạn.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666173267/1_ydkrod.jpg",
  },
  {
    name: "Khai vị",
    description:
      "Món khai vị còn được gọi là món ăn nhẹ do “tính chất” nhỏ nhắn, không chiếm nhiều thời gian chế biến. Món khai vị có hương vị không quá nổi bật vì mục đích chính là để khởi đầu một bữa ăn. ",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666174137/image25-1652236352-319-width900height506_zdrhk4.jpg",
  },
  {
    name: "Món chay",
    description:
      "Thuần chay là một chế độ ăn uống chỉ sử dụng thực phẩm có nguồn gốc thực vật như rau xanh, trái cây, các loại hạt, nấm, đậu phộng, v.v., mà không sử dụng hải sản hoặc thịt có nguồn gốc động vật. để chuẩn bị thức ăn.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666230514/bo-kho-chay-500_wj3fpg.jpg",
  },
  {
    name: "Món chính",
    description:
      "Món chính là phần ăn quan trọng nhất, hấp dẫn nhất trong bữa ăn, thường được ăn sau khi đã dùng món khai vị. Nền ẩm thực Việt Nam đa dạng sẽ đem đến cho chúng ta nhiều nguyên liệu, gia vị và cách chế biến món ăn chính.Món chính không chỉ đơn giản là món ăn dùng sau khi thưởng thức món khai vị, đó còn là món ăn chứa nhiều chất dinh dưỡng, cung cấp lượng đạm thiết yếu cho cơ thể. Không như món khai vị, món chính đóng vai trò chủ chốt trong bữa ăn, cung cấp nhiều dưỡng chất, bổ sung nặng lượng hao hụt.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666230854/bo-bit-tet-880_t1ihis.jpg",
  },
  {
    name: "Món ngon - Nhanh - Dễ",
    description:
      "Những món ăn có công đoạn chế biến tương đối nhanh, nhưng cũng không kém phần ngon miệng",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666230896/com-006_epjmlt.jpg",
  },
  {
    name: "Healthy",
    description:
      "Bao gồ m tinh bột chưa tinh chế, chất đạm nguyên bản, chất béo tốt cho sức khỏe và các loại rau củ quả. Với chế độ trên, chất đạm và các loại rau của quả chiếm phần lớn. Đặc biệt với những bạn có tập thể hình gần như chất đạm sẽ chiếm tận 40-50% trong mỗi khẩu phần ăn.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666230945/thuc-don-heathy-diet-khoa-hoc-cho-7-ngay-cua-ban-3-2900_gnm9fp.jpg",
  },
  {
    name: "Bánh",
    description:
      "Bánh là loại món ăn làm bằng bột mì hay bột gạo có hương vị ngọt, mặn, béo...có thể hấp, nướng, chiên,... Bánh có nhiều cách chế biến khác nhau như: rán, chiên, nướng, hấp hoặc đôi khi là ăn sống. Thành phần và nguyên liệu của bánh rất đa dạng. Ngoài thành phần chính, bánh còn một số thành phần phụ như nước dùng, rau, đồ khô, kẹo, hoặc trái cây tươi, các loại hạt, kem. Một số loại bánh còn được trang trí rất công phu, tỉ mỉ.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666231001/thanh-pham-1165_rbxyoi.jpg",
  },
  {
    name: "Nước chấm",
    description:
      'Nước chấm là tên gọi chung cho nhiều loại "xốt chấm" được sử dụng khá thường xuyên dưới dạng một loại gia vị.Riêng Nước chấm Việt Nam thường có vị ngọt, chua, mặn,và cay.',
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666231042/Cac-loai-xot-Au-quyen-luc-trong-nen-am-thuc_vu7zcf.jpg",
  },
  {
    name: "Món ngon - Sinh viên",
    description:
      "Nếu bạn là một sinh viên sống xa nhà mà vẫn không biết hôm nay sẽ ăn gì thì hãy tham khảo những thực đơn giá rẻ nhưng vẫn đủ chất cho sinh viên nghèo dưới đây nhé.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666231131/Stuffed-Tofu-in-Tomato-Sauce-vietnamese-inspired-vegan-sweet-sauce-healthy-protein-packed-thumb-3_qbfkiy.webp",
  },
  {
    name: "Món xào",
    description:
      "Xào là một cách nấu chín thức ăn bằng cách đảo lộn thức ăn với một ít dầu ăn hay mỡ nước trên chảo nóng cùng với gia vị. Yếu tố quan trọng là chảo phải ở nhiệt độ thật nóng trong khi người làm bếp phải mau tay đảo trộn các thành phần trong chảo.",
    image:
      "https://res.cloudinary.com/devdaz/image/upload/v1666237513/30-mon-xao-ngon-ban-khong-nen-bo-lo-1-1620290908_xgrhd8.webp",
  },
];

export default categories;
