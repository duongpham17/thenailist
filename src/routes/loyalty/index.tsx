import styles from './Loyalty.module.scss';
import React from 'react'

const Index = () => {
  return (
    <div className={styles.container}>
        <h1>LOYALTY PROGRAMME</h1>
        <p>
            At The Nailist, we recognise loyalty should be rewarded. 
            That's why we have created our loyalty programme with you in mind!
        </p>
        <p>
            <b>How many points do I earn per pound I spend?</b>
            <span>
                You'll earn 5 points for every £1 you spend in the salon. 
                Please note, bookings made via third party platforms such as Treatwell do not count towards the spending as 
                you would have already paid directly to Treatwell. 
            </span>
        </p>
        <p>
            <b>How much are the points worth?</b>
            <span>500 points = £5 credit! You can redeem points on everything from treatments to gift cards.</span>
        </p>
        <p>
            <b>How do I use my points?</b>
            <span>
            Reward points can only be redeemed in the salon.
            Please book your treatment online as normal and upon payment for treatment, 
            let the team know you would like to redeem your points and they would happily apply the credit to your transaction.
            </span>
        </p>
        <p>
           <b> How many people can I refer for the bonus?</b>
            <span>
                There is no limit! As long as they are a new customer and they complete their first treatment, you will get the points.
            </span>
        </p>
        <p>
            <b>Can I swap my points for cash?</b>
            <span>Sorry, there are no cash exchanges for the points...</span>
        </p>
        <p>
            <b>How many points can I use in a single transaction?</b>
            <span>
                As many as you like as long as they are in increments of 500 points.
            </span>
        </p>
        <p>
            <b>Do my points run out?</b>
            <span>
                Points expire after 2 years. You will be reminded 30 days before any points are due to expire.
            </span>
        </p>
        <p>
            <b>What should I do if my points aren't showing?</b>
            <span>Please contact our customer care team at hello@thenailist.co..uk</span>
        </p>
        <p>
            <b>Where can I find my points total?</b>
            <span>Click on the account icon on the top right on the website and log in. Then click Rewards on the drop down.</span>
        </p>
        <p>
            <b>How many manis do I need for a free one?</b>
            <span>This depends on your spend level. You'll get 5 points for every £1 you spend!</span>
        </p>
        <p>
            <b> Are there any hidden catches? </b>
            <span>
                Nope. We want you to feel valued and rewarded. You can spend your points
                on anything from gift cards to treatments.
            </span>
        </p>
        <p>
            <b>I've done a group booking. Who gets the points?</b>
            <span>
                The person who makes the booking will accumulate all the points so make sure you take it in turns!
            </span>
        </p>
    </div>
  )
}

export default Index