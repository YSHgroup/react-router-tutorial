import { useEffect } from 'react';
import {
	Outlet,
	NavLink,
	useLoaderData,
	Form,
	useNavigation,
	useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	const contacts = await getContacts(q);
	return { contacts, q };
};

export const action = async () => {
	const contact = await createContact();
	return { contact };
};

export default function Root() {
	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q');

	const changeHandler = (event) => {
		const isFirstSearch = q === null;
		console.log('isFirstSearch: ', isFirstSearch);
		submit(event.currentTarget.form, { replace: !isFirstSearch });
	};
	// Synchronize the URL and Form state
	useEffect(() => {
		document.getElementById('q').value = q;
	}, [q]);
	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					<Form id='search-form' role='search'>
						<input
							id='q'
							className={searching ? 'loading' : ''}
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
							defaultValue={q}
							onChange={changeHandler}
						/>
						<div id='search-spinner' aria-hidden hidden={!searching} />
						<div className='sr-only' aria-live='polite'></div>
					</Form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>
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
				</nav>
			</div>
			<div
				id='detail'
				className={navigation.state === 'loading' ? 'loading' : ''}
			>
				<Outlet />
			</div>
		</>
	);
}
