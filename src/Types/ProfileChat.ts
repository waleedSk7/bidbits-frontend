import Message from "./message";
import Product from "./product";

export default interface ProfileChat {
	highestBid: number;
	messages: Message[];
	product: Product;
}
