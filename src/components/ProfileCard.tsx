export default function ProfileCard({
  hidden,
  image,
  title,
  detail,
}: {
  hidden: string;
  image: string;
  title: string;
  detail: string;
}) {
  return (
    <>
      <div
        className={`${hidden} card glass lg:card-side bg-base-100 shadow-xl`}
      >
        <figure>
          <img src={image} alt="Album" className="w-[300px] h-[300px]" />
        </figure>
        <div className="card-body w-[400px] mx-auto">
          <h1 className="text-center font-bold text-3xl">{title}</h1>
          <p className="text-justify">{detail}</p>
        </div>
      </div>
    </>
  );
}
