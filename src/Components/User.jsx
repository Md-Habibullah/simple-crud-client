import { useLoaderData, useParams } from "react-router-dom";


const User = () => {
    // const { id } = useParams()
    // console.log(id)
    const allUser = useLoaderData()
    console.log(allUser)

    const submit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const user = { name, email }
        fetch(`http://localhost:5000/users/${allUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
    return (
        <form onSubmit={submit}>
            <input type="text" name="name" defaultValue={allUser.name} id="" /> <br /> <br />
            <input type="email" name="email" defaultValue={allUser.email} id="" /> <br /> <br />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default User;