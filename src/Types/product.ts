import Message from "./message";

export default interface Product {
	productId: string;
	productName: string;
	startingBid: number;
	details: string;
	image: string;
	highestBid: number;
	messages?: Message[];
}
