function Card() {
    return (
        <div className="flex absolute inset-0 backdrop-blur-xl h-full w-full justify-center">
            <div className="h-20 w-100 border-2 p-2 border-white rounded-md shadow-2xs self-center z-10 bg-[var(--bg)]">
                <h2>ERROR:</h2>
                <p>All of the inputs must be full when creating a task!!!</p>
            </div>
        </div>
    );
}

export default Card;