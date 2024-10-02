import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LanguageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const langList = ["en", "fr", "ar"];
  const { t, i18n } = useTranslation();
  const storedLanguage = localStorage.getItem("selectedLanguage");
  const [lang, setLang] = useState(
    storedLanguage || navigator.language.split("-")[0] || "en"
  );
  // const [lang, setLang] = useState("en-GB");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.dir = i18n.dir(lang);
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const changeLanguage = (lng: string) => {
    setLang(lng);
    localStorage.setItem("selectedLanguage", lng);
    navigate("/", { replace: true });
  };

  return (
    <div className="relative flex flex-col items-center  rounded-lg">
      <button
        className="bg-foreground capitalize px-3 py-1 w-full h-full flex items-center justify-between font-serif text-sm rounded-lg tracking-wider border-transparent active:border-white duration-300 active:text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {lang}
        {!isOpen ? (
          <AiOutlineCaretDown className="h-2" />
        ) : (
          <AiOutlineCaretUp className="h-2" />
        )}
      </button>
      {isOpen && (
        <div className="bg-foreground absolute  w-full top-8 rounded-lg flex flex-col items-center  p-1  ">
          {langList.map((lang, index) => (
            <div
              key={index}
              className="w-full flex hover:bg-blue-300 justify-center rounded-r-lg border-l-transparent hover:border-l-white border-l-2 cursor-pointer "
              onClick={() => {
                setLang(lang);
                changeLanguage(lang);
                setIsOpen(prev => !prev);
              }}
            >
              <h3 className="capitalize font-header ">{t(lang)}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
