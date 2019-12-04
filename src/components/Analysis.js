import React, { useState, useEffect } from 'react';
import lineIntersect from '@turf/line-intersect';
import lineString from 'turf-linestring';
import { CircularProgress, Grid } from '@material-ui/core';

const Analysis = ({ data }) => {

    const [intersects, setIntersects] = useState([]);

    const [intersectSteps, setIntersectSteps] = useState([]);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const calculateData = () => {
            new Promise(resolve => {
                const lines = data.map(d => lineString(d.x.map((x, i) => [x, d.y[i]])));
                if (lines.length !== 0) {
                    const result = lineIntersect(...lines).features;
                    setIntersects(result
                        .sort((a, b) => Math.abs(a.geometry.coordinates[0]) + Math.abs(a.geometry.coordinates[1]) - Math.abs((b.geometry.coordinates[0]) - Math.abs(b.geometry.coordinates[1]))))

                    const stepsIntersec = result.map(intersect => {
                        const line1Count = data[0].x.findIndex((x, i) => x === intersect.geometry.coordinates[0] && data[0].y[i] === intersect.geometry.coordinates[1]) + 1;
                        const line2Count = data[1].x.findIndex((x, i) => x === intersect.geometry.coordinates[0] && data[1].y[i] === intersect.geometry.coordinates[1]) + 1;
                        return {
                            x: intersect.geometry.coordinates[0],
                            y: intersect.geometry.coordinates[1],
                            line1Count,
                            line2Count
                        }
                    }).sort((a, b) => a.line1Count + a.line2Count - b.line1Count - b.line2Count);
                    setIntersectSteps(stepsIntersec)
                }
                setLoading(false);
                resolve();
            });
        }
        setTimeout(calculateData);
    }, [data])

    return <div>
        {isLoading && <CircularProgress size={25} disableShrink={true} variant='indeterminate' />}
        <Grid container={true}>
            <Grid item={true} xs={6}>Solution 1</Grid>
            <Grid item={true} xs={6}>Solution 2</Grid>
            <Grid item={true} xs={6}>
                {
                    intersects
                        .map((intersection, i) => <p key={i}>
                            Intersection: {intersection.geometry.coordinates[0]}/{intersection.geometry.coordinates[1]}, Distance {Math.abs(intersection.geometry.coordinates[0]) + Math.abs(intersection.geometry.coordinates[1])}
                        </p>)
                }
            </Grid>
            <Grid item={true} xs={6}>
                {
                    intersectSteps
                        .map((intersection, i) => <p key={i}>
                            Intersection: {intersection.x}/{intersection.y}, Distance 1:{intersection.line1Count} + Distance 2:{intersection.line2Count} = {intersection.line1Count + intersection.line2Count}
                        </p>)
                }
            </Grid>

        </Grid>

    </div>
}


export default Analysis;