import { Outlet, NavLink, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export const loader = async () => {
	const contacts = await getContacts();
	return { contacts };
};

export const action = async () => {
	const contact = await createContact();
	return { contact };
};

export default function Root() {
	const { contacts } = useLoaderData();
	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					<form id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
						/>
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				{contacts.length ? (
					<ul>
						{contacts.map((contact) => (
							<li key={contact.id}>
								<NavLink
									to={`contacts/${contact.id}`}
									className={({ isActive, isPending }) =>
										isActive ? 'active' : isPending ? 'peding' : ''
									}
								>
									{contact.first || contact.last ? (
										<>
											{contact.first} {contact.last}
										</>
									) : (
										<i>No Name</i>
									)}{' '}
									{contact.favorite && <span>★</span>}
								</NavLink>
							</li>
						))}
					</ul>
				) : (
					<p>
						<i>No contacts</i>
					</p>
				)}
			</div>
			<div id='detail'>
				<Outlet />
			</div>
		</>
	);
}
