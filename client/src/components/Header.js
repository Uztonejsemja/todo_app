import images from "../assets/images"

const Header = () => {
    return(
        <header style={{
            width: '25%',
            margin: 'auto',
            marginTop: '50px',
            padding: '25px 25px',
            borderRadius: '10px',
            backgroundColor: '#7a7585',
            display: 'flex',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent: 'center'
        }}>
            <h1 style={{
                margin: 0,
                color:'#e8dae4',
                fontSize: 30,
                fontWeight: 'bold'
            }}>TODO LIST</h1>

            <img src={ images.note } alt="noteImg"/>
        </header>
    )
}

export default Header;