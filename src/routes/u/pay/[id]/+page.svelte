<script lang="ts">
	import { getDate } from '$lib';
	import type { TransactionModel } from '$lib/types/transaction';
	import type { UserModel } from '$lib/types/user';
	import type { PageData } from './$types';

	export let data: PageData;
	let transaction: TransactionModel = data.transaction;
	let customer: UserModel | undefined = data.customer;
	let employee: UserModel | undefined = data.employee;
</script>

<!-- Now we can continue along -->
<h4 class="text-black text-xl mb-7 mt-4">Reviewing an order</h4>

<!-- What comes next. -->
<div class="flex lg:flex-row flex-col lg:gap-8 gap-2 lg:pr-28">
	<!-- First, the image -->
	<img class="rounded-xl" src='/image-order.png' alt="SCUPay payment module" />

	<!-- Second, the text. -->
	<div class="flex flex-col w-full gap-4 lg:mt-0 mt-5">
		<!-- Each item in tow -->
		<div class="flex flex-row justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Customer name</p>
			<p class="text-black lg:text-base text-sm">{customer?.firstname} {customer?.lastname}</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- Each item in tow -->
		<div class="flex flex-row justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Employee name</p>
			<p class="text-black lg:text-base text-sm">{employee?.firstname} {employee?.lastname}</p>
		</div>

		<!-- To the specifics of this payment -->
		<div class="bg-gray-500 h-px" />

		<!-- Each item in tow -->
		<div class="flex flex-row justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Asset name</p>
			<p class="text-black lg:text-base text-sm">{transaction?.assetName}</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- The sttus of this payment  -->
		<div class="flex flex-row justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Date ordered</p>
			<p class="text-black lg:text-base text-sm">
				{getDate(new Date(transaction?.timestamp ?? 0))}
			</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px mb-10" />

		<!-- Description -->
		<div class="flex flex-row gap-4 justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Price</p>
			<p class="text-black lg:text-base text-sm">₦{transaction?.price.toFixed(2) ?? "0.00"}</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- Each item in tow -->
		<div class="flex flex-row justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Quantity</p>
			<p class="text-black lg:text-base text-sm">{transaction?.quantity ?? 0}</p>
		</div>

		<!-- Some space -->
		<div class="bg-gray-500 h-px" />

		<!-- Session -->
		<div class="flex flex-row gap-4 justify-between">
			<p class="text-gray-500 lg:text-base text-sm">Total</p>
			<p class="text-black lg:text-base text-sm">₦{(transaction?.price * transaction?.quantity).toFixed(2) ?? "0.00"}</p>
		</div>
	</div>
</div>
