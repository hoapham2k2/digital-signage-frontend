export default function RenderDuration(duration: number) {
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration % 60);
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;

	// Usage
	// const duration = 120;
	// console.log(RenderDuration(duration)); // 2:00
}
