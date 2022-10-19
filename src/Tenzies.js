const Tenzies = ({value,isheld,handleClick}) => {
    const Style = {
        backgroundColor:isheld ? "green" : "white"
    }
    return ( 
        <div className="tenzies-box" style={Style} onClick={handleClick}>
            {value}
        </div>
     );
}
export default Tenzies;