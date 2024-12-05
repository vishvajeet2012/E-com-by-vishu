function ContextApi (props){
    const prop = { props };
    
  const userId = prop.props.userInfo._id;
  console.log(userId)
  const userIdd = localStorage.getItem("userId");
  console.warn("Retrieved User ID:", userIdd);
              
    return(
        <>


        </>
    )
}
export default ContextApi