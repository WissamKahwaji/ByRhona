import { AboutUsContent } from "./type";

const AboutUsInfo = ({ aboutUsContent }: AboutUsContent) => {
  return (
    <section className="flex flex-col items-center justify-center gap-16 py-12">
      {aboutUsContent?.map((contactUs, index) => (
        <div
          key={contactUs._id}
          className={`flex flex-col ${
            index % 2 == 0 ? "md:flex-row-reverse" : ""
          } items-center justify-center gap-4 px-4 md:flex-row md:items-start md:gap-16`}
        >
          <div className=" md:h-[400px] md:w-[400px] h-[400px] w-full">
            <img
              className=" h-full w-full object-cover"
              src={contactUs.img}
              alt={contactUs.title}
            />
          </div>

          <div className="md:max-w-md space-y-2">
            <p className="font-bold font-header text-primary text-2xl">
              {contactUs.title}
            </p>
            <p
              style={{
                direction: "rtl",
                textAlign: "justify",
                textAlignLast: "left", // Add this line
              }}
              className="text-start text-primary first-letter:pl-2 whitespace-pre-wrap"
            >
              {contactUs.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AboutUsInfo;
