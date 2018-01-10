import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

class StoreItem extends Component {
    render() {
        const {store} = this.props;
        const store_name = store.store_name;
        const store_address = `${store.street_name} ${store.street_number}, ${store.postal_code} ${store.city}, ${store.country}`;

        const rootPath = this.props.rootPath || '/';

        return (
            <Card className='storeItem'>
                <CardMedia className='cardMedia'>
                    <img src='/stores/store.png' alt='store' />
                </CardMedia>
				<CardTitle title={store_name} />
				<CardText style={{paddingTop: 0}}>
					<List>
						<ListItem
                            disabled={true}
                            primaryText='Address'
                            style={{padding: '8px 0'}}
                            secondaryText={store_address}>
                            <a className='list-right' target='_blank' href={'https://www.google.gr/maps/search/' + encodeURIComponent(store_address)}>Map</a>
                        </ListItem>
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
					<RaisedButton fullWidth={true} href={rootPath + 'store/' + store.store_id} label={this.props.label || 'View vehicles'} />
				</CardActions>
            </Card>
        );
    }
}

export default StoreItem;
