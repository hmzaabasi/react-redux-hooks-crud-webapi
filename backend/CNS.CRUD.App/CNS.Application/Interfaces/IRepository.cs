using System.Collections.Generic;
using System.Threading.Tasks;

namespace CNS.Application.Interfaces
{
    //Interface for all basic crud operations
    public interface IRepository<T>
    {
        public Task<T> Create(T _object);
        public Task<T> GetById(int Id);
        public Task<IEnumerable<T>> GetAll();
        public void Update(T _object);
        public void Delete(T _object);
    }
}
