import { Card, Avatar, CardHeader, CardBody } from '@nextui-org/react';

function Footer() {
    const stats = [
        { title: 'customers', count: '220k', avatar: 'src\\images\\1.png' },
        { title: 'maintenance', count: '230k', avatar: 'src\\images\\2.png' },
        { title: 'donation', count: '270k', avatar: 'src\\images\\3.png' },
        { title: 'watchtime', count: '130k', avatar: 'src\\images\\4.png' },
    ];

    return (
        <Card shadow="sm" className='h-[170px]'>
            <CardHeader className='ml-[70px]'>
            <h4 className="font-bold text-large mb-2 text-center">Statistics</h4>
            </CardHeader>
            <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex'}}>
                                <Avatar src={stat.avatar} size="lg" style={{ marginRight: '10px'}} />
                                <div>
                                    <h4 className="font-bold text-large mb-[7px] text-left">{stat.count}</h4>
                                    <p className="text-small text-center">{stat.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

export default Footer;
