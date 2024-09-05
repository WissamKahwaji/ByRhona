import { Link } from "react-router-dom";

const test = () => {
  const productTypes = [
    { _id: "1", name: "Accessories" },
    { _id: "1", name: "Home Touch" },
  ];
  return (
    <div className="flex w-full flex-col font-header">
      <div className="flex flex-col justify-between gap-8 border-t border-foreground bg-foreground/30 px-6 py-8 shadow-negative md:flex-row md:gap-10  md:px-4  md:py-6 ">
        <div>
          <Link to={"/"} className="">
            <div className="flex flex-row  ">
              <img
                src="https://i.imgur.com/GhSSHdx.png"
                alt=""
                className="h-24 w-24 "
              />
            </div>
          </Link>
          <div className="mt-5 flex-col md:mt-8 md:flex md:flex-row md:gap-16 items-center">
            <div className=" mb-7 flex gap-12 md:mb-0">
              <div className="">
                <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                  Useful Links
                </p>
                <ul className="flex flex-col justify-center gap-2 text-sm">
                  <li>
                    <Link to={"/"}>
                      <p className=" font-semibold capitalize text-gray-700">
                        home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/about-us"}>
                      <p className=" font-semibold capitalize text-gray-700">
                        about us
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                  shop
                </p>
                <ul className="flex flex-col justify-center gap-2 text-sm">
                  {productTypes?.slice(0, 4).map(productType => (
                    <li key={productType._id}>
                      <Link to={`/products/${productType._id}`}>
                        <p className=" font-semibold capitalize text-gray-700">
                          {productType.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xl font-semibold capitalize text-secondary">
                Get In Touch
              </p>

              <ul className="flex flex-col justify-center gap-2 text-sm">
                <li>
                  <p className="font-semibold">info@byrhona.com</p>
                </li>

                <li>
                  <p className="font-semibold">+971 5081 537 35 </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default test;
