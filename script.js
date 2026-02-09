const _supabase = supabase.createClient('https://wdoqyqllfqmggwxwmubs.supabase.co', 'YOUR_KEY');

// 1. Time-Greeting
function initGreeting() {
    const hr = new Date().getHours();
    const msg = hr < 12 ? "Good Morning" : hr < 17 ? "Good Afternoon" : "Good Evening";
    document.getElementById('greeting').innerText = `${msg}, Chillywatts.`;
}

// 2. Fetch Q&A with Admin Answers
async function fetchQA() {
    const container = document.getElementById('qa-container');
    container.innerHTML = '<div class="skeleton"></div>'; 

    const { data } = await _supabase.from('qa').select('*').order('id', { ascending: false });

    if (data) {
        container.innerHTML = '';
        data.forEach(item => {
            container.innerHTML += `
                <div class="qa-card animate-pop-in">
                    <p><b>Q:</b> ${item.question}</p>
                    ${item.answer ? `<div class="admin-answer"><b>Chillywatts:</b> ${item.answer}</div>` : `<p style="font-size:10px; opacity:0.5;">Awaiting response...</p>`}
                </div>`;
        });
    }
}

// 3. Post a Review
async function postReview() {
    const name = document.getElementById('rev-name').value;
    const content = document.getElementById('rev-content').value;
    if(!name || !content) return;

    await _supabase.from('reviews').insert([{ client_name: name, content }]);
    alert("Review posted! (Backend removal enabled)");
    fetchReviews();
}

// ... Additional logic for fetchReviews() and askQuestion() ...

initGreeting();
fetchQA();

