import Link from "next/link";
import Modal from "./Modal";

export default function Card({
  title,
  detail,
  route,
  postData,
  idModal,
}: {
  title: string;
  detail: string;
  route: string;
  postData?: any;
  idModal?: string;
}) {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto my-2 md:m-2">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{detail}</p>
          <div className="card-actions justify-center">
            {route === "modal" ? (
              <Modal postData={postData} idModal={idModal!} />
            ) : route === "" ? null : (
              <Link href={route} className="btn bg-yellow-100 text-black">
                More
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
