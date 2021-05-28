import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface Props {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

const useStyles = makeStyles<Theme>((theme: Theme) => {
    return createStyles( {
        root: {
            maxWidth: 350
        },
    })
}
);

export default function Team(props: Props) {
    return (
        <React.Fragment>
            <CardContent>
            <Typography paragraph>
                ID: {props.id}
            </Typography>
            <Typography paragraph>
                Abbreviation: {props.abbreviation}
            </Typography>
            <Typography paragraph>
                City: {props.city}
            </Typography>
            <Typography paragraph>
                Conference: {props.conference}
            </Typography>
            <Typography paragraph>
                Division: {props.division}
            </Typography>      
            <Typography paragraph>
                Full Name: {props.full_name}
            </Typography>   
            <Typography paragraph>
                Name: {props.name}
            </Typography>   

            </CardContent>
        </React.Fragment>
       
    );
}
