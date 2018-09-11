const { Customer, Location, Lane, RateRule, RateOutput, sequelize } = require('./sequelize');


const RatingEngine = 
async function getRateRules(message, customer_id, distance_traveled) {
  try {
    console.log(`1. Get origin_id by address: ${message.p_job_address}`)
    let promise = new Promise((resolve, reject) => { 
        const p_address = message.p_job_address.slice(0, 24);
        console.log(p_address);
        Location.findOne({
            where: {
                address: {
                    [sequelize.Op.like]: 
                        `${p_address}%`
                    
                }
            }
        })
        .then(res => {
            console.log(res);
                console.log(`   Found ${res.name}`)
                resolve(res.location_id);
        }).catch(err => {
            console.log(err);
        });
    });

    const origin_id = await promise;
    console.log(origin_id);


    console.log(`2. Get destination_id by address: ${message.d_job_address}`)
    let promise1 = new Promise((resolve) => {  
        const d_address = message.d_job_address.slice(0, 24)
        Location.findOne({
            where: {
               address: {
                [sequelize.Op.like]: 
                        `${d_address}%`
                
                }
            }
    })
    .then(res => {
        if (res != null) {
            console.log(res);
            console.log(`   Found ${res.name}`)
            resolve(res.location_id)
        }
    });
});

    const destination_id = await promise1;
 

    console.log(`3. Get customer by id: ${customer_id}`)
    await Customer.findById(customer_id)
    .then(x => {
        if (x != null) {
            console.log(`   Found ${x.name}`)
            customer = x
        }
    });
    console.log(`4. Get origin location by id: ${origin_id}`)
        await Location.findById(origin_id)
        .then(res => {
            if (res != null) {
                console.log(`   Found ${res.name}`)
                origin = res
            }
        });
    
    console.log(`5. Get destination location by id: ${destination_id}`)
    await Location.findById(destination_id)
    .then(x => {
        if (x != null) {
            console.log(`   Found ${x.name}`)
            destination = x
        }
    });

    console.log(`6. Get lane by origin: ${origin_id} and destination: ${destination_id}`)
        let promise2 = new Promise((resolve) => {   
            Lane.findOne({ where: {origin_location_id: origin_id, destination_location_id: destination_id} })
        .then(res => {
                if (res != null) {
                    console.log(`   Found ${res.description}`)
                    resolve(res)
                }
            });
        });

    const lane = await promise2;
    
    const ratedDistance = await getRatedDistance(lane, distance_traveled);
    
    console.log(`7. Get rate rule by rated distance: ${ratedDistance}`)
    let promise3 = new Promise((resolve) => {
        let rDistance = ratedDistance * 1609.344;
        sequelize.query(`SELECT * FROM rate_rule WHERE customer_id = ${customer_id} AND distance_start <= ${rDistance} AND distance_end >= ${rDistance} LIMIT 1`)

        .then(res => {
            resolve(res[0][0]);
        })
        
    });

    const rule = await promise3;

    
    console.log(`8. Calculating the price`)
    let price = await getPrice(rule.type, rule.rate, ratedDistance)
    console.log(`   price $${price}`)
  

    
    console.log(`9. Creating the rating output record.`)
    await RateOutput.create({
        customer_id: customer_id,
        move_id: message.d_pickup_delivery_relationship,
        matched_lane_id: lane.lane_id,
        matched_rule_id: rule.rule_id,
        distance_start: rule.distance_start,
        distance_end: rule.distance_end,
        actual_distance: (distance_traveled*1609.344),
        lane_distance: lane.distance,
        rate: rule.rate,
        type: rule.type,
        class: rule.class,
        sla: 'time',
        price: price
    }, function() {
        callback({
            customer_id: customer_id,
            move_id: message.d_pickup_delivery_relationship,
            matched_lane_id: lane.lane_id,
            matched_rule_id: rule.rule_id,
            distance_start: rule.distance_start,
            distance_end: rule.distance_end,
            actual_distance: (distance_traveled*1609.344),
            lane_distance: lane.distance,
            rate: rule.rate,
            type: rule.type,
            class: rule.class,
            sla: 'time',
            price: price
        });
    });
  
  } catch (err) {
    console.log(`Failed to get rate rules and other supporting data for customer_id: ${customer_id}: ${err}`)
  }
}

function getPrice(type, rate, distance) {
    if (type == 'per') {
        return rate * distance;
    }else{
        return rate;
    }
}

function getRatedDistance(lane, distance) {
    if (lane === null) {
        return distance;
    }else{
        return (lane.distance/1609.344);
    }
}

module.exports = {RatingEngine}