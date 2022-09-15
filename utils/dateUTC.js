const dateUTC = (d) => {
    d.setHours(d.getHours() + 3);
    return d;
}

export default dateUTC;
