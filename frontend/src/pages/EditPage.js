import Edit from "../components/Edit";

function EditPage() {
    //permet d'accéder aux arguments décodés de la requête contenus dans l'URL ('GET')
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return (
        <Edit id={id}/>
    )


};

export default EditPage