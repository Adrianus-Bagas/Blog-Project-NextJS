import { useGetPostComment } from "@/service/posts/hooks";
import { useGetUserById } from "@/service/users/hooks";

export default function Modal({
  postData,
  idModal,
}: {
  postData: any;
  idModal: string;
}) {
  const { data } = useGetPostComment(postData?.id);
  const dataUser = useGetUserById(postData?.userId);
  return (
    <>
      <label htmlFor={idModal} className="btn bg-yellow-100 text-black">
        More
      </label>
      <input type="checkbox" id={idModal} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative h-screen overflow-auto">
          <label
            htmlFor={idModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="h-1/3 bg-yellow-100 flex items-center">
            <p className="text-2xl p-2">{postData?.title}</p>
          </div>
          <div className="h-[50px] flex justify-between text-sm bg-base-100 border-yellow-100 border-solid border-2">
            <div className="text-left flex items-center">
              <div className="avatar mx-2">
                <div className="w-[25px] rounded-full ring ring-yellow-100 ring-offset-base-100 ring-offset-2">
                  <img src={dataUser.data?.image} />
                </div>
              </div>
              <p>
                {dataUser.data?.firstName +
                  " " +
                  dataUser.data?.lastName +
                  " " +
                  dataUser.data?.maidenName}
              </p>
            </div>
            <div className="flex">
              <div className="text-right flex items-center mx-2">
                <svg className="svg-icon w-[25px] mx-1" viewBox="0 0 20 20">
                  <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                </svg>
                <p>{postData?.reactions}</p>
              </div>
              <div className="text-right flex items-center mx-2">
                <svg className="svg-icon w-[25px] mx-1" viewBox="0 0 20 20">
                  <path d="M17.657,2.982H2.342c-0.234,0-0.425,0.191-0.425,0.426v10.21c0,0.234,0.191,0.426,0.425,0.426h3.404v2.553c0,0.397,0.48,0.547,0.725,0.302l2.889-2.854h8.298c0.234,0,0.426-0.191,0.426-0.426V3.408C18.083,3.174,17.892,2.982,17.657,2.982M17.232,13.192H9.185c-0.113,0-0.219,0.045-0.3,0.124l-2.289,2.262v-1.96c0-0.233-0.191-0.426-0.425-0.426H2.767V3.833h14.465V13.192z M10,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.488-0.668,1.488-1.489C11.488,7.905,10.821,7.237,10,7.237 M10,9.364c-0.352,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C10.638,9.077,10.351,9.364,10,9.364 M14.254,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489s1.489-0.668,1.489-1.489C15.743,7.905,15.075,7.237,14.254,7.237 M14.254,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.352,0,0.639,0.287,0.639,0.638C14.893,9.077,14.605,9.364,14.254,9.364 M5.746,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.489-0.668,1.489-1.489C7.234,7.905,6.566,7.237,5.746,7.237 M5.746,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C6.384,9.077,6.096,9.364,5.746,9.364"></path>
                </svg>
                <p>{data?.length}</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-justify text-base">{postData?.body}</p>
            {postData?.tags.map((tag: any) => (
              <span className="badge bg-yellow-100 text-black m-2">{tag}</span>
            ))}
          </div>
          <div className="divider">Comments</div>
          <div className="h-2/3 overflow-auto">
            {data?.length === 0 ? (
              <h1 className="mt-5">No Comment</h1>
            ) : (
              data?.map((comment: any) => (
                <div key={comment.id} className="chat chat-start">
                  <div className="chat-header">{comment.user.username}</div>
                  <div className="chat-bubble text-justify">{comment.body}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
