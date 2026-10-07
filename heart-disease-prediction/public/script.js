const form = document.getElementById("predictionForm");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    loading.style.display = "block";
    result.style.display = "none";

    const data = {
        age: Number(document.getElementById("age").value),
        sex: Number(document.getElementById("sex").value),
        cp: Number(document.getElementById("cp").value),
        trestbps: Number(document.getElementById("trestbps").value),
        chol: Number(document.getElementById("chol").value),
        fbs: Number(document.getElementById("fbs").value),
        restecg: Number(document.getElementById("restecg").value),
        thalach: Number(document.getElementById("thalach").value),
        exang: Number(document.getElementById("exang").value),
        oldpeak: Number(document.getElementById("oldpeak").value),
        slope: Number(document.getElementById("slope").value),
        ca: Number(document.getElementById("ca").value),
        thal: Number(document.getElementById("thal").value)
    };

    try {

        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resultData = await response.json();

        if (!response.ok) {
            throw new Error(resultData.detail || "Prediction failed");
        }

        result.style.display = "block";

        result.innerHTML = `
            <div>${resultData.result}</div>
            <div style="font-size:16px; margin-top:10px;">
                Estimated probability: ${resultData.probability}%
            </div>
        `;

    } catch (error) {

        result.style.display = "block";
        result.innerHTML = `
            Error: ${error.message}
        `;

    } finally {

        loading.style.display = "none";
    }
});