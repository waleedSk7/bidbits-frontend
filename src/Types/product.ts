import Message from "./message";
import User from "./user";

export default interface Product {
	productId: string;
	productName: string;
	startingBid: number;
	details: string;
	image: string;
	highestBid: number;
	messages?: Message[];
	user: User;
}
