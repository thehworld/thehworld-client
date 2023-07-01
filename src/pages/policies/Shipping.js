import React from 'react'
import LayoutOne from '../../layouts/LayoutOne'
import { Container } from 'react-bootstrap'

export default function Shipping() {
  return (
    <div>
      <LayoutOne>
      <div className='container'>
      <h2 style={{textAlign: "center",paddingTop: "20px"}}>Shipping and Returns</h2>
      <br />
      <p>Purchases are shipped from our warehouse by reputed courier agencies. Please allow following
        number of days from receipt of your order.
        <br />
        • For India orders – All domestic prepaid orders are processed within 2 business day, whereas COD
        orders take 3 business days to process as we verify the order personally to ensure a seamless
        process. Orders will be delivered within 3-7 business days upon confirmation. Delivery to locations
        which are in low coverage or difficult to reach areas may take between 10-12 working days.
        <br/ >
        • For International orders – All international orders are processed within 3 business day.
        You can expect delivery of the order within 10-15 business day.
      </p>
      <h4>
      ORDER DELIVERIES WILL BE MADE BETWEEN
      </h4>
      <p>• 10:00 AM – 6:00 PM Monday – Saturday. Excluding public holidays.
        <br />
        • Goods will need to be signed for upon delivery. If you cannot be there to sign for your delivery please
        suggest an alternative i.e. a family member, colleague, neighbour, etc. However The H World takes no
        responsibility for goods signed by an alternative person.
        <br />
        • The H World is not responsible for damage after delivery.
        <br />
        • For any complaints with regards to your order please contact Customer Care within 7 business days
        of your order delivery for resolution.
        <br />
        • Shipping and handling rates may vary based on product, packaging, size, volume, type and other
        considerations. The shipping and handling charges are given at the time of check out and consumers
        will know about this before making payments</p>
        <h3 style={{paddingTop: "20px"}}>SHIPPING CHARGES</h3>
        <br />
        <h3>For India Orders:</h3>
        <p>• We ship products throughout India. The shipping rates vary according to the total cart value as
          follows:
          <br />
          For prepaid orders:
          <br />
          1. Below Rs. 500 – Rs. 45 is charged
          <br />
          2. From Rs. 501 to Rs. 998 – Rs. 60 is charged
          <br />
          3. Above Rs. 998, we have free shipping
          For COD orders:
          <br />
          Below Rs. 10,000 - Rs. 89 is charged for shipping.
          <br />
          We do not accept COD orders above Rs. 10,000.</p>
          <br />

          <h3  style={{paddingTop: "20px"}}>For International Orders:</h3>
          <br />
          • We also ship internationally across all countries
          <br />
          • Shipping and handling rates vary based on the shipping destination. You will see the final shipping
          and handling charges at the time of checkout after you provide the shipping address for your order.
          <br />
          • All international orders may attract local duties in that country and the customer will have to pay
          locally, accordingly.
          <br />

          <h3 style={{paddingTop: "20px"}}>RETURNS & REFUNDS POLICY</h3>
          <br />
          <p style={{marginBottom: "50px"}}>
          At The H World, we strive to give you the very best shopping experience possible. However,
          considering that opened or damaged products cannot be reused, we cannot accept exchange or
          return of opened or used products once sold or delivered.
          <br />
          ● The H World is not responsible for any damage caused after delivery.
          <br />
          ● In case the product is received in a damaged (broken, leakage or any other)
          condition, refund or replacement will take place only if informed within 24 hours
          with video proof of unboxing, from the time of delivery.
          <br />

          enquiry@The H World.in (For shipment related queries)
          <br />
          ● Returns and exchanges requests will be subject to checking and vetting by The H World.
          <br />
          ● Damages due to neglect, improper usage or wrong application will not be covered under
          this Policy.
          <br />
          ● Once your return request has been accepted, the refund will be processed within 7
          business days and the amount will be transferred via the same payment mode used
          while placing the order.
          <br />
          ● A refund can be obtained if the order is cancelled by you either before the order ships or
          within 24 hours of order placement, whichever is earlier. If accepted, it will be processed
          within 7 days. No refund shall be made after the order is shipped.
          <br />
          ● No Refund shall be made once goods are sold.
          </p>
        </div>
        
        </LayoutOne>
        
    </div>
  )
}
