import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Badge } from "@/components/ui/badge"

import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react"
  

const OrderListTable = () => {
	return (
		<Table className='bg-white rounded-2xl mx-auto'>
			<TableCaption>A list of your recent orders.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>No.</TableHead>
					<TableHead>ID</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Customer Name</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>1</TableCell>
					<TableCell>#2212</TableCell>
					<TableCell>22 January 2002</TableCell>
					<TableCell>Anushk Jain</TableCell>
					<TableCell>$250.00</TableCell>
					<TableCell><Badge variant="outline">New Order</Badge>
                    </TableCell>
					<TableCell>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='h-8 w-8 p-0'>
									<span className='sr-only'>Open menu</span>
									<MoreHorizontal />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className="bg-white">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem
									onClick={() =>
										// navigator.clipboard.writeText(
										// 	payment.id
										// )
                                        console.log("Hello")
									}
								>
									Copy payment ID
								</DropdownMenuItem>
								<DropdownMenuSeparator className="bg-gray-500"/>
								<DropdownMenuItem>
									View customer
								</DropdownMenuItem>
								<DropdownMenuItem>
									View payment details
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default OrderListTable;
