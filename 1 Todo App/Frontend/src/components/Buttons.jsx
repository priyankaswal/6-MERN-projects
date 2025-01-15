// we can define event listners here also but this is not the best choice instead we can paas behaviour as props as well. eg.
// const onClickHandler = () =>{
//   console.log('Button Clicked');
// }

const Button = ({ type, btnText, handler }) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors duration-300";
  let typeClasses = "";

  if (type === "success") {
    typeClasses = "bg-green-500 hover:bg-green-600 text-white";
  } else if (type === "danger") {
    typeClasses = "bg-red-500 hover:bg-red-600 text-white";
  } else {
    typeClasses = "bg-blue-500 hover:bg-blue-600 text-white";
  }

  return (
    <button className={`${baseClasses} ${typeClasses}`} onClick={handler}>
      {btnText}
    </button>
  );
};

export default Button;

// export function DangerButton() {
//   return (
//     <button className="red-button"> Delete </button>
//   );
// }

// export function SuccessButton() {
//   return (
//     <button className="green-button"> Save </button>
//   );
// }
// export default DangerButton;
