import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

function PasswordConfirmModal({isOpened, onClose}) {
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
    const dialogBoundaries = dialogModal.current.getBoundingClientRect()
      if(
        e.clientX < dialogBoundaries.left ||
        e.clientX > dialogBoundaries.right ||
        e.clientY < dialogBoundaries.top ||
        e.clientY > dialogBoundaries.bottom &&
        e.key !== "Escape"
      ) {
        //dialogModal.current.close() 
        onClose();
      }
  }

  useEffect(() => {
    if(isOpened){
      dialogModal.current.showModal();
    }else{
      dialogModal.current.close();
    }
    const dialogElement = dialogModal.current;
    dialogElement.addEventListener('click', handleOutsideClick);
    dialogElement.addEventListener('close', () => {
      onClose();
    })
    return () => {
      dialogElement.removeEventListener('click', handleOutsideClick);
      dialogElement.removeEventListener('close', onClose)
    }

  },[isOpened])

 


  return (
    <>
      <dialog ref={dialogModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="password">Confirm your password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit">Send</button>
            <button type="reset" onClick={() => {
              dialogModal.current.close()
              onClose();
              //TODO: find out the problem with the formMethod="dialog"
              // and either fix it or code an equivalent
            }}>Cancel</button>
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
