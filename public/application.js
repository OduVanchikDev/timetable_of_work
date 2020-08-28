document.addEventListener('DOMContentLoaded', () => {
  const listener = document.getElementById('filter');
  listener.addEventListener('change', async (event) => {
    const filter = event.target.value;
    const findId = document.getElementsByName('user')[0];
    const id = findId.getAttribute('id');
    window.location.assign(`/user/${id}?filter=${filter}`);
    // const result = await fetch(`/user/${id}`, {
    //   method: 'POST',
    //   body: JSON.stringify({ filter }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const finaliresult = await result.json();
  });
});
