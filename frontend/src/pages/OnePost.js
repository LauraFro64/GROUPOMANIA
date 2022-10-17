import OneCard from '../components/OneCard'

function OnePost() {
    //permet d'accéder aux arguments décodés de la requête contenus dans l'URL ('GET')
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return (
        <OneCard id={id}/>
    )
}

export default OnePost