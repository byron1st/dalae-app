const lineBreakRegExp = /\n/g;
const urlRegExp =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*$/;
const separator = ' ';

export function convert(content: string): string {
	return content
		.replace(lineBreakRegExp, '<br />')
		.split(separator)
		.map((textToken) =>
			textToken.match(urlRegExp)
				? `<a class="underline decoration-dashed cursor-pointer hover:text-slate-500 active:text-slate-300 transition" href="${textToken}" target="_blank" rel="noreferrer noopener">${textToken}</a>`
				: textToken
		)
		.join(separator);
}
