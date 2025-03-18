import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import { useBooking } from '../../features/bookings/useBooking';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import CheckBox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from '../bookings/useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking = {}, isLoading: isLoadingBooking } = useBooking();

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking.isPaid]);
	const moveBack = useMoveBack();

	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
	const { checkin, isCheckingIn } = useCheckin();
	const { settings = {}, isLoading: isLoadingSettings } = useSettings();
	const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	if (isLoadingBooking || isLoadingSettings) return <Spinner />;

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<CheckBox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}
						disabled={hasBreakfast}
					>
						Want add breakfast for {formatCurrency(settings.breakfastPrice)}?
					</CheckBox>
				</Box>
			)}

			<Box>
				<CheckBox
					checked={confirmPaid}
					onChange={() => {
						setConfirmPaid((paid) => !paid);
					}}
					id='confirm'
					disabled={confirmPaid}
				>
					I confirm that {guests.fullName} has paid the amount{' '}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(
								totalPrice
						  )} + ${formatCurrency(optionalBreakfastPrice)})`}
				</CheckBox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isCheckingIn || isLoadingSettings}
				>
					Check in booking #{bookingId}
				</Button>
				<Button variation='secondary' onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
