export type AboutUsContent = {
  _id: string;
  img: string;
  title: string;
  titleFr: string;
  titleAr: string;
  text: string;
  textFr: string;
  textAr: string;
};

export type AboutUsInfo = {
  title: string;
  description: string;
  content: AboutUsContent[];
};
