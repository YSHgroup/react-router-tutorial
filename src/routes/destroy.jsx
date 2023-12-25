import { redirect } from 'react-router-dom'
import { deleteContact } from '../contacts'

export async function action ({params}) {
    // throw new Error('Ohh dang')
    await deleteContact(params.contactId)
    return redirect("/")
}

