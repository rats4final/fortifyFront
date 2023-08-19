import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

function PasswordConfirmModal({ isOpened, onClose }) {
  const dialogModal = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    onClose();
  }

  const handleOutsideClick = (e) => {
    const dialogBoundaries = dialogModal.current.getBoundingClientRect();
    if (
      e.clientX < dialogBoundaries.left ||
      e.clientX > dialogBoundaries.right ||
      e.clientY < dialogBoundaries.top ||
      (e.clientY > dialogBoundaries.bottom && e.key !== "Escape")
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpened) {
      dialogModal.current.showModal();
    } else {
      dialogModal.current.close();
    }
    const dialogElement = dialogModal.current;
    dialogElement.addEventListener("click", handleOutsideClick);
    dialogElement.addEventListener("close", () => {
      onClose();
    });
    return () => {
      dialogElement.removeEventListener("click", handleOutsideClick);
      dialogElement.removeEventListener("close", onClose);
    };
  }, [isOpened]);

  return (
    <>
      <dialog className="rounded-lg bg-white p-8 shadow-2xl" ref={dialogModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <label htmlFor="password">Please Confirm your Password</label>
            <input
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors?.password?.message}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-green-600 px-2 py-1 rounded-lg" type="submit">
              Send
            </button>
            <button
              className="bg-red-600 px-2 py-1 rounded-lg"
              type="submit"
              formMethod="dialog"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

PasswordConfirmModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PasswordConfirmModal;
