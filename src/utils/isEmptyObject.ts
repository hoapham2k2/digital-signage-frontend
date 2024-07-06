export default function IsEmptyObject(obj: object): boolean {
	return Object.keys(obj).length === 0;
}
