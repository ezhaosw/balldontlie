import React, { useState } from 'react';
import Team from './Team';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
    id: number;
    date: string;
    home_team_score: number;
    visitor_team_score: number;
    season: number;
    period: number;
    status: string;
    time: string;
    postseason: boolean;
    home_team: any;
    visitor_team: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) => {
    return createStyles( {
        root: {
            maxWidth: 350
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest
            })
        },
        expandOpen: {
            transform: 'rotate(180deg)'
        },
    })
}
);

export default function Game(props: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpanded = () => {
        setExpanded(!expanded);
    }

    const getTeamInfo = (team: any) => {
        return Array(team).map((item) => (
            <Team 
            id={item.id}
            abbreviation={item.abbreviation}
            city={item.city}
            conference={item.conference}
            division={item.division}
            full_name={item.full_name}
            name={item.name}
            key={item.id}
            />
        ))
    }

    return (
        <Card className={classes.root}>
            <CardHeader
            title={props.id}
            />
            <CardContent>
                <Typography paragraph>
                   Date: {props.date}
                </Typography>
                <Typography paragraph>
                    Season: {props.season}
                </Typography>
                <Typography paragraph>
                   Period: {props.period}
                </Typography>
                <Typography paragraph>
                    Status: {props.status}
                </Typography>
                <Typography paragraph>
                    Time: {props.time}
                </Typography>
                <Typography paragraph>
                    Postseason: {props.postseason}
                </Typography>
                <Typography paragraph>
                    Home Team: {props.home_team.name}
                </Typography>
                <Typography paragraph>
                    Home Team Score: {props.home_team_score}
                </Typography>
                <Typography paragraph>
                    Visitor Team: {props.visitor_team.name}
                </Typography>
                <Typography paragraph>
                    Visitor Team Score: {props.visitor_team_score}
                </Typography>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded
                    })}
                    onClick={handleExpanded}
                    >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="h4" gutterBottom>
                    Teams
                </Typography>
                    {getTeamInfo(props.home_team)}
                    {getTeamInfo(props.visitor_team)}
            </Collapse>
        </Card>

    );
}