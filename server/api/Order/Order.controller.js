import Order from './Order.model';
import {errorJsonResponse} from '../../config/commonHelper';
import UserDetail from '../UserDetail/UserDetail.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode)
                .json(entity);
        }
        return null;
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity) {
            res.status(404)
                .end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode)
            .send(err);
    };
}

// Gets a single Order from the DB
export function show(req, res) {
    return Order.find({FbPageId: req.params.id})
        .exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export async function order(req, res) {
    try {
        let FindOrder = await Order.findOne({_id: req.params.id});
        if(FindOrder) {
            res.status(200)
                .json({
                    Order: FindOrder
                });
        } else {
            res.status(400)
                .json(errorJsonResponse('your order has been removed', 'your order has been removed'));
        }
    } catch(error) {
        res.status(501)
            .json(errorJsonResponse(error.toString(), error.toString()));
    }
}

export async function updateOrder(req, res, next) {
    try {
        const order = req.body.Order;
        const OrderId = order._id;
        delete order._id;
        order.Status = 'Confirmed';
        await UserDetail.findOneAndUpdate({
            FbSPID: order.FbSPID, ShippingMobile: null,
            ShippingAddress1: null,
            ShippingPostalCode: null
        }, {
            ShippingMobile: order.ShippingMobile,
            ShippingAddress1: order.ShippingAddress1,
            ShippingPostalCode: order.ShippingPostalCode,
        }, {new: true, setDefaultsOnInsert: true});
        let UpdateOrder = await Order.findOneAndUpdate({_id: OrderId}, order, {new: true, setDefaultsOnInsert: true});
        if(UpdateOrder) {
            res.status(200)
                .json({
                    data: {
                        Order: UpdateOrder
                    },
                    result: 'Your order successfully placed'
                });
        } else {
            res.status(400)
                .json(errorJsonResponse('your order has been removed', 'your order has been removed'));
        }
    } catch(error) {
        console.log(error);
        res.status(501)
            .json(errorJsonResponse(error.toString(), error.toString()));
    }
}
