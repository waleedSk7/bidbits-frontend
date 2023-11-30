import Message from "./message";
import Product from "./product";
import User from "./user";

export default interface ProfileChat {
	userMessages: Record<User["userId"], Message[]>;
	product: Product;
}
