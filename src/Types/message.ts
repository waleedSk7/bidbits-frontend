import Product from "./product";
import User from "./user";

export default interface Message {
	message: string;
	messageId: number;
	sender: User;
	product: Product;
	receiver: User;
	timestamp: String;
}
