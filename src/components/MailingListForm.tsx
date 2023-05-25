// export const prerender = false;

import { createSignal } from "solid-js";

export default function MailingListForm(props: any) {
  const [email, setEmail] = createSignal("");

  console.log('apiHost', props.apiHost)

  const clickHandler = (e: Event) => {
    e.preventDefault();

    const response = fetch(props.apiHost + "/api/mailing-list-users", {
      method: "POST",
      mode: "cors",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email(),
      }),
    });
  };

  return (
    <div>
      <label>Email:</label>
      <input
        class="text-black"
        type="email"
        name="email"
        value={email()}
        required
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <button onClick={(e) => clickHandler(e)}>Submit X</button>
      <span>{email()}</span>
    </div>
  );
}
