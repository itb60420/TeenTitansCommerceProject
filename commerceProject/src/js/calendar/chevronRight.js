function ChevronRight(props) {
    let year = props.viewDay.getFullYear();
    let month = props.viewDay.getMonth();

    return ( 
        <i id="chevron-right" onClick={() => props.changeViewDay({year: year, month: month + 1,number: 1})} >
        </i>
    );
}

export default ChevronRight;