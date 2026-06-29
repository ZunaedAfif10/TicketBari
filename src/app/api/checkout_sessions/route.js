import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const user = await getUserSession();
        const body = await req.json();


        const lineObj = {
            price_data: {
                currency: 'usd',
                unit_amount: body?.ticketPrice * 100,
                product_data: {
                    name: body?.ticketTitle,
                },
            },
            quantity: body?.quantity,
        };

        const metaObj = {
            email: user?.email || '',
            userId: user?.id || '',
            bookingId: body?.bookingId || '',
            ticketId: body?.ticketId || '',
            ticketTitle: body?.ticketTitle || '',
            vendorEmail: body?.vendorEmail || '',
            amount: parseFloat(body?.ticketPrice).toFixed(2) * body?.quantity,
            quantity: body?.quantity,
        };

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                lineObj
            ],
            metadata: metaObj,
            mode: 'payment',
            success_url: `${origin}/dashboard/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard/user/cancel?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json({ url: session.url })
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}